use crate::credentials;
use crate::user::{get_subscribed_users, subscribe_user, un_subscribe_user};
use crate::{
    auth::logout
};
use axum::{
    extract::DefaultBodyLimit,
    http::{header, StatusCode},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use tower::ServiceBuilder;
use tower_http::limit::RequestBodyLimitLayer;
use crate::file::{get_blog_file, get_book_file, get_tmp_file, upload_file};

use crate::{
    auth::{get_user_session, login, signup},
    AppState,
};
use serde_json::json;
use time::Duration;
use tower_http::cors::CorsLayer;
use tower_sessions::{Expiry, SessionManagerLayer};
use tower_sessions_redis_store::{fred::prelude::*, RedisStore};

pub async fn home() -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(json!({"sankar": "boro"})),
    ))
}

pub async fn create_router(connection: AppState, cors: CorsLayer) -> Router {
    let pool = RedisPool::new(
        RedisConfig::from_url("redis://:sankar@127.0.0.1:6379/").unwrap(),
        None,
        None,
        None,
        6,
    )
    .unwrap();

    pool.connect();
    pool.wait_for_connect().await.unwrap();

    let session_store = RedisStore::new(pool);
    let session_layer = SessionManagerLayer::new(session_store)
        .with_secure(false)
        .with_expiry(Expiry::OnInactivity(Duration::days(3)));

    let auth_routes = Router::new()
        .route("/login", get(login).post(login))
        .route("/signup", post(signup))
        .route(
            "/user/session",
            get(get_user_session).post(get_user_session),
        )
        .route("/logout", post(logout));

    let cred_routes = Router::new()
        .route("/add", post(credentials::add))
        .route("/delete/:uid", post(credentials::delete))
        .route("/edit", post(credentials::edit))
        .route("/get/:user_id", get(credentials::get));

    let user_routes = Router::new()
        .route("/:user_id/subscribe", post(subscribe_user))
        .route("/:user_id/un_subscribe", post(un_subscribe_user))
        .route("/get_subscribed_users", get(get_subscribed_users));

    Router::new()
        .nest("/aegis/auth", auth_routes)
        .nest("/aegis/creds", cred_routes)
        .nest("/aegis/user", user_routes)
        .route("/aegis/upload_file", post(upload_file))
        .route("/aegis/tmp/:uid/:size/:filename", get(get_tmp_file))
        .route("/", get(home))
        .with_state(connection)
        .layer(cors)
        .layer(session_layer)
        .layer(DefaultBodyLimit::disable())
        .layer(
            ServiceBuilder::new()
                .layer(RequestBodyLimitLayer::new(12 * 1024 * 1024))
                .into_inner(),
        )
}
