use crate::error::AppError;
use crate::utils::GetUserId;
use crate::AppState;
use axum::{
    extract::Path as AxumPath,
    extract::State,
    http::{header, StatusCode},
    response::IntoResponse,
    Json,
};
use serde_json::json;
use tower_sessions::Session;

pub async fn get_subscribed_users(
    session: Session,
    State(pool): State<AppState>,
    AxumPath(user_id): AxumPath<i32>,
) -> Result<impl IntoResponse, AppError> {
    let auth_user_id = session.get_user_id().await?;

    let conn = pool.pg_pool.get().await?;
    let rows = conn
        .query(
            "SELECT subscribed_id FROM subscription where user_id=$1",
            &[&auth_user_id, &user_id],
        )
        .await?;
    let mut subscribed_ids: Vec<i32> = Vec::new();
    for row in rows.iter() {
        subscribed_ids.push(row.get(0));
    }
    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(subscribed_ids),
    ))
}

pub async fn subscribe_user(
    session: Session,
    State(pool): State<AppState>,
    AxumPath(user_id): AxumPath<i32>,
) -> Result<impl IntoResponse, AppError> {
    let auth_user_id = session.get_user_id().await?;

    let conn = pool.pg_pool.get().await?;
    let row = conn
        .query_one(
            "SELECT * FROM subscription where user_id=$1 and subscribed_id=$2",
            &[&auth_user_id, &user_id],
        )
        .await?;
    let mut message = String::from("");
    if row.is_empty() {
        message = String::from("Created");
        conn.query_one(
            "INSERT INTO subscription(user_id, subscribed_id) VALUES($1, $2)",
            &[&auth_user_id, &user_id],
        )
        .await?;
    } else {
        message = String::from("Aldready subscribed.");
    }

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(json!({ "message" : message })),
    ))
}

pub async fn un_subscribe_user(
    session: Session,
    State(pool): State<AppState>,
    AxumPath(user_id): AxumPath<i32>,
) -> Result<impl IntoResponse, AppError> {
    let auth_user_id = session.get_user_id().await?;

    let conn = pool.pg_pool.get().await?;
    let row = conn
        .query_one(
            "SELECT * FROM subscription where user_id=$1 and subscribed_id=$2",
            &[&auth_user_id, &user_id],
        )
        .await?;

    let mut message = String::from("");

    if row.is_empty() {
        message = String::from("Column does not exist.");
    } else {
        conn.query_one(
            "DELETE FROM subscription where user_id = $1 AND subscribed_id = $2",
            &[&auth_user_id, &user_id],
        )
        .await?;
        message = String::from("User unfollowed.");
    }

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(json!({ "message" : message })),
    ))
}
