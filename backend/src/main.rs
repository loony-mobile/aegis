mod auth;
mod error;
mod file;
#[macro_use]
mod credentials;
mod route;
mod search;
mod traits;
mod types;
mod utils;

use axum::http::{
    header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
    HeaderValue, Method,
};
use bb8::Pool;
use bb8_postgres::{bb8, PostgresConnectionManager};
use search::Search;
// use log4rs;
use tokio_postgres::NoTls;
use tower_http::cors::CorsLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[derive(Clone)]
#[allow(dead_code)]
pub struct Dirs {
    tmp_upload: String,
    v2_upload: String,
}

#[derive(Clone)]
pub struct AppState {
    pub pg_pool: Pool<PostgresConnectionManager<NoTls>>,
    pub dirs: Dirs,
    pub search: Search,
}

async fn init() -> AppState {
    let pg_host = std::env::var("V2_PG_HOSTNAME").unwrap();
    let pg_user = std::env::var("V2_PG_USERNAME").unwrap();
    let pg_dbname = std::env::var("V2_PG_DBNAME").unwrap();
    let pg_password = std::env::var("V2_PG_PASSWORD").unwrap();
    let tmp_upload = String::from(std::env::var("TMP_UPLOADS").unwrap());
    let v2_upload = String::from(std::env::var("V2_UPLOADS").unwrap());

    // set up connection pool
    let pg_manager = PostgresConnectionManager::new_from_stringlike(
        format!(
            "host={} user={} dbname={} password={}",
            pg_host, pg_user, pg_dbname, pg_password
        ),
        NoTls,
    )
    .unwrap();
    let pg_pool = Pool::builder().build(pg_manager).await.unwrap();

    return AppState {
        pg_pool,
        dirs: Dirs {
            tmp_upload,
            v2_upload,
        },
        search: search::init_search(),
    };
}

#[tokio::main]
async fn main() {
    // log4rs::init_file("config/log4rs.yaml", Default::default()).unwrap();
    let host = std::env::var("V2_HOSTNAME").unwrap();
    let port = std::env::var("V2_PORT").unwrap();
    let origins = std::env::var("V2_ALLOWED_ORIGINS").unwrap();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "example_tokio_postgres=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let connection = init().await;

    // Parse the comma-separated string into a Vec<String>
    let origins: Vec<HeaderValue> = origins
        .split(',')
        .map(|s| s.parse::<HeaderValue>().unwrap())
        .collect();

    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_credentials(true)
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    let router = route::create_router(connection, cors).await;
    let listener = tokio::net::TcpListener::bind(format!("{host}:{port}"))
        .await
        .unwrap();
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, router).await.unwrap();
}
