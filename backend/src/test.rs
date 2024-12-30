use axum::{
    extract::State,
    http::{header, Response, StatusCode},
    response::IntoResponse,
    Extension, Json,
};

pub async fn login(
    State(pool): State<AppState>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)>  {
    let user_response = serde_json::json!({"status": "success","data": serde_json::json!({
        "user": "Sankar".to_string()
    })});
    Ok(Json(user_response))

}