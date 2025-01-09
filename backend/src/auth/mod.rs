use std::str::FromStr;
use rand::{distributions::Alphanumeric, Rng};

use crate::error::AppError;
use crate::AppState;
use axum::{
    extract::State,
    http::{self, header, HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use bcrypt::{hash, verify, DEFAULT_COST};
use chrono::{Duration as ChronoDuration, Local};
use cookie::{Cookie, CookieBuilder};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use lazy_static::lazy_static;
use regex::Regex;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use time::Duration;
use tower_sessions::Session;
use validator::{Validate, ValidationError};

lazy_static! {
    static ref EMAIL_REGEX: Regex = Regex::new(r"^[^\s@]+@[^\s@]+\.[^\s@]+$").unwrap();
    static ref PHONE_REGEX: Regex = Regex::new(r"^\+?[1-9]\d{1,14}$").unwrap();
}

#[derive(Deserialize, Debug, Validate)]
pub struct LoginForm {
    #[validate(custom = "validate_email")]
    email: String,
    #[validate(length(min = 6))]
    password: String,
}

#[derive(Deserialize, Debug, Validate)]
pub struct LoginPinForm {
    #[validate(custom = "validate_email")]
    email: String,
    #[validate(length(min = 6))]
    login_pin: String,
}

#[derive(Deserialize, Debug, Validate)]
pub struct SignupForm {
    #[validate(custom = "validate_email")]
    email: String,
    #[validate(length(min = 6))]
    password: String,
    #[validate(length(min = 6))]
    login_pin: String,
    #[validate(length(min = 3))]
    fname: String,
    lname: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct UserData {
    uid: i32,
    fname: String,
    lname: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    aud: Option<String>, // Optional. Audience
    exp: usize, // Required (validate_exp defaults to true in validation). Expiration time (as UTC timestamp)
    iat: Option<usize>, // Optional. Issued at (as UTC timestamp)
    iss: Option<String>, // Optional. Issuer
    nbf: Option<usize>, // Optional. Not Before (as UTC timestamp)
    sub: Option<String>, // Optional. Subject (whom token refers to)
    data: UserData,
}

fn validate_email(email: &str) -> Result<(), ValidationError> {
    if EMAIL_REGEX.is_match(email) {
        Ok(())
    } else if PHONE_REGEX.is_match(email) {
        Ok(())
    } else {
        return Err(ValidationError::new("Invalid email."));
    }
}

pub async fn login(
    session: Session,
    State(pool): State<AppState>,
    Json(body): Json<LoginForm>,
) -> Result<impl IntoResponse, AppError> {
    body.validate()?;

    let conn = pool.pg_pool.get().await?;
    let users_row = conn
        .query_opt(
            "select uid, fname, lname, password from users where email=$1",
            &[&body.email],
        )
        .await?;
    
    let users_row = if let Some(users) = users_row {
        users
    } else {
        return Err(AppError::InternalServerError("User not found".to_string()));
    };
    
    let user_id: i32 = users_row.get(0);
    let fname: String = users_row.get(1);
    let lname: String = users_row.get(2);
    let password: String = users_row.get(3);
    
    let secret_keys_row = conn
    .query_opt(
        "select secret_key from secret_keys where user_id=$1",
        &[&user_id],
    )
    .await?;

    let secret_keys_row = if let Some(secret_key) = secret_keys_row {
        secret_key
    } else {
        return Err(AppError::InternalServerError("Secret key for user not found.".to_string()));
    };

    let is_valid_password = verify(&body.password, &password)?;

    if !is_valid_password {
        return Err(AppError::InternalServerError(
            "Invalid password".to_string(),
        ));
    }

    let secret_key: String = secret_keys_row.get(0);

    let user_response = json!({
        "uid": user_id,
        "email": &body.email.clone(),
        "fname": fname.clone(),
        "lname": lname.clone(),
        "secret_key": secret_key,
    });
    let current_time = Local::now();
    let expiration_time = current_time + ChronoDuration::days(3);

    let claims = Claims {
        data: UserData {
            fname: fname.clone(),
            lname: lname.clone(),
            uid: user_id,
        },
        exp: expiration_time.timestamp() as usize,
        aud: None,
        iat: Some(current_time.timestamp() as usize),
        iss: None,
        nbf: None,
        sub: None,
    };
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret_key.as_ref()),
    )?;

    let cookie = CookieBuilder::new("Authorization", token)
        .same_site(cookie::SameSite::Strict)
        .secure(true)
        .http_only(true)
        .max_age(Duration::days(3))
        .path("/")
        .build()
        .to_string();

    let mut header_map = HeaderMap::new();
    header_map.insert(header::SET_COOKIE, cookie.parse().unwrap());
    session
        .insert("AUTH_USER", &serde_json::to_string(&user_response).unwrap())
        .await?;
    session.insert("AUTH_USER_ID", user_id).await?;

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        header_map,
        Json(user_response),
    ))
}

pub async fn login_pin(
    session: Session,
    State(pool): State<AppState>,
    Json(body): Json<LoginPinForm>,
) -> Result<impl IntoResponse, AppError> {
    body.validate()?;

    let conn = pool.pg_pool.get().await?;
    let users_row = conn
        .query_opt(
            "select uid, fname, lname, login_pin from users where email=$1",
            &[&body.email],
        )
        .await?;

    let users_row = if let Some(user) = users_row {
        user
    } else {
        return Err(AppError::InternalServerError("User not found".to_string()));
    };

    let user_id: i32 = users_row.get(0);
    let fname: String = users_row.get(1);
    let lname: String = users_row.get(2);
    let password: String = users_row.get(3);

    let is_valid_password = *&body.login_pin == *password;

    if !is_valid_password {
        return Err(AppError::InternalServerError(
            "Invalid password".to_string(),
        ));
    }

    let secret_keys_row = conn
    .query_opt(
        "select secret_key from secret_keys where user_id=$1",
        &[&user_id],
    )
    .await?;

    let secret_keys_row = if let Some(secret_key) = secret_keys_row {
        secret_key
    } else {
        return Err(AppError::InternalServerError("Secret key for user not found.".to_string()));
    };

    let secret_key: String = secret_keys_row.get(0);

    let user_response = json!({
        "uid": user_id,
        "email": &body.email.clone(),
        "fname": fname.clone(),
        "lname": lname.clone(),
        "secret_key": secret_key,
    });
    let current_time = Local::now();
    let expiration_time = current_time + ChronoDuration::days(3);

    let claims = Claims {
        data: UserData {
            fname: fname.clone(),
            lname: lname.clone(),
            uid: user_id,
        },
        exp: expiration_time.timestamp() as usize,
        aud: None,
        iat: Some(current_time.timestamp() as usize),
        iss: None,
        nbf: None,
        sub: None,
    };
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret_key.as_ref()),
    )?;

    let cookie = CookieBuilder::new("Authorization", token)
        .same_site(cookie::SameSite::Strict)
        .secure(true)
        .http_only(true)
        .max_age(Duration::days(3))
        .path("/")
        .build()
        .to_string();

    let mut header_map = HeaderMap::new();
    header_map.insert(header::SET_COOKIE, cookie.parse().unwrap());
    session
        .insert("AUTH_USER", &serde_json::to_string(&user_response).unwrap())
        .await?;
    session.insert("AUTH_USER_ID", user_id).await?;

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        header_map,
        Json(user_response),
    ))
}

pub async fn signup(
    State(state): State<AppState>,
    Json(body): Json<SignupForm>,
) -> Result<impl IntoResponse, AppError> {
    body.validate()?;

    let random_string: String = rand::thread_rng()
    .sample_iter(&Alphanumeric)
    .take(16) // Length of the string
    .map(char::from)
    .collect();

    let conn = state.pg_pool.get().await?;

    let row = conn
        .query_opt(
            "select email from users where email=$1",
            &[&body.email],
        )
        .await?;

    if row.is_some() {
        return Err(AppError::InternalServerError("User exists".to_string()));
    }

    let query1 = conn.prepare("INSERT INTO users(email, password, login_pin, fname, lname) values($1, $2, $3, $4, $5) RETURNING uid").await?;
    let query2 = conn.prepare("INSERT INTO secret_keys(user_id, prev_secret_key, secret_key) VALUES($1, $2, $3)").await?;

    let hashed_password = hash(&body.password, DEFAULT_COST)?;
    let res = conn
        .query_one(
            &query1,
            &[&body.email, &hashed_password, &body.login_pin, &body.fname, &body.lname],
        )
        .await?;
    let user_id: i32 = res.get(0);
    conn
        .execute(
            &query2,
            &[&user_id, &random_string, &random_string],
        )
        .await?;

    let user_response = json!({
        "uid": user_id,
        "email": &body.email.clone(),
        "fname": &body.fname.clone(),
        "lname": &body.lname.clone(),
    });

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        // header_map,
        Json(user_response),
    ))
}

async fn extract_authorization(header: &http::HeaderMap) -> Option<String> {
    if let Some(app_cookies) = header.get("cookie") {
        // Parse the cookie string
        let cookies: Vec<Cookie<'_>> = app_cookies
            .to_str()
            .unwrap()
            .split("; ")
            .map(|s| Cookie::from_str(s).unwrap())
            .collect();

        // Iterate over the parsed cookies
        for cookie in cookies {
            if cookie.name() == "Authorization" {
                let token = cookie.value().to_string();
                return Some(token);
            }
        }
    }
    None
}

pub async fn get_user_session(header: http::HeaderMap) -> Result<impl IntoResponse, AppError> {
    let secret_key = std::env::var("V2_SECRET_KEY").unwrap();

    if let Some(token) = extract_authorization(&header).await {
        let token = decode::<Claims>(
            &token,
            &DecodingKey::from_secret(secret_key.as_ref()),
            &Validation::default(),
        )?;
        let claims = token.claims;
        return Ok((
            StatusCode::OK,
            [(header::CONTENT_TYPE, "application/json")],
            // header_map,
            Json(claims.data),
        ));
    } else {
        Err(AppError::InternalServerError("Invalid token".to_string()))
    }
}

pub async fn logout(session: Session) -> Result<impl IntoResponse, AppError> {
    let cookie = CookieBuilder::new("Authorization", "".to_string())
        .same_site(cookie::SameSite::None)
        .secure(true)
        .http_only(true)
        .max_age(Duration::seconds(0))
        .path("/")
        .build()
        .to_string();

    let mut header_map = HeaderMap::new();
    header_map.insert(header::SET_COOKIE, cookie.parse().unwrap());
    session.remove::<Value>("AUTH_USER").await?;
    session.remove::<Value>("AUTH_USER_ID").await?;

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        header_map,
        Json(json!({
            "status": "LOGGED_OUT"
        })),
    ))
}
