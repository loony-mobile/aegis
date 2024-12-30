use crate::error::AppError;
use crate::AppState;
use axum::{
    extract::{Path as AxumPath, State},
    http::{header, StatusCode},
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AddDocRequest {
    name: String,
    username: String,
    password: String,
    url: String,
    metadata: String,
    user_id: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Creds {
    uid: i32,
    name: String,
    username: String,
    password: String,
    url: String,
    metadata: String,
}

pub async fn get(
    State(state): State<AppState>,
    AxumPath(user_id): AxumPath<i32>,
) -> Result<impl IntoResponse, AppError> {
    let conn = state.pg_pool.get().await?;

    let mut creds: Vec<Creds> = Vec::new();
    let rows = conn
        .query(
            "SELECT uid, name, username, password, url, metadata FROM credentials WHERE user_id=$1",
            &[&user_id],
        )
        .await?;
    for row in rows.iter() {
        creds.push(Creds {
            uid: row.get(0),
            name: row.get(1),
            username: row.get(2),
            password: row.get(3),
            url: row.get(4),
            metadata: row.get(5),
        });
    }

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(creds),
    ))
}

pub async fn add(
    State(state): State<AppState>,
    Json(body): Json<AddDocRequest>,
) -> Result<impl IntoResponse, AppError> {
    let conn = state.pg_pool.get().await?;

    conn.execute(
        "INSERT INTO credentials(name, username, password, url, user_id, metadata) values($1, $2, $3, $4, $5, $6) RETURNING uid",
        &[&body.name, &body.username, &body.password, &body.url, &body.user_id, &body.metadata],
    )
    .await?;

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(body),
    ))
}

pub async fn delete(
    State(state): State<AppState>,
    AxumPath(uid): AxumPath<i32>,
) -> Result<impl IntoResponse, AppError> {
    let conn = state.pg_pool.get().await?;

    conn.execute("DELETE from credentials WHERE uid=$1", &[&uid])
        .await?;

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(serde_json::json!({ "status": 200 })),
    ))
}

#[derive(Serialize, Deserialize, Debug)]
pub struct EditDocRequest {
    uid: i32,
    name: String,
    username: String,
    password: String,
    url: String,
    metadata: String,
}

pub async fn edit(
    State(state): State<AppState>,
    Json(body): Json<EditDocRequest>,
) -> Result<impl IntoResponse, AppError> {
    let conn = state.pg_pool.get().await?;

    conn.execute("UPDATE credentials SET name=$1, username=$2, password=$3, url=$4, metadata=$5 WHERE uid=$6", &[&body.name, &body.username, &body.password, &body.url, &body.metadata, &body.uid])
        .await?;

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/json")],
        Json(serde_json::json!({ "status": 200 })),
    ))
}
