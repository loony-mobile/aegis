use axum::{
    extract::multipart::MultipartError,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use bcrypt::BcryptError;
use image::ImageError;
use validator::ValidationErrors;

pub enum AppError {
    // NotFound(String),
    InternalServerError(String),
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}

impl From<tokio_postgres::Error> for AppError {
    fn from(err: tokio_postgres::Error) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}

impl From<bb8::RunError<tokio_postgres::Error>> for AppError {
    fn from(err: bb8::RunError<tokio_postgres::Error>) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}

impl From<jsonwebtoken::errors::Error> for AppError {
    fn from(err: jsonwebtoken::errors::Error) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}

impl From<BcryptError> for AppError {
    fn from(err: BcryptError) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}
impl From<MultipartError> for AppError {
    fn from(err: MultipartError) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}
impl From<ImageError> for AppError {
    fn from(err: ImageError) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}
impl From<tower_sessions::session::Error> for AppError {
    fn from(err: tower_sessions::session::Error) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}
impl From<ValidationErrors> for AppError {
    fn from(err: ValidationErrors) -> Self {
        AppError::InternalServerError(
            serde_json::to_string(&err.field_errors())
                .unwrap_or("Failed to serialize ValidationErrors".to_string()),
        )
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let body = match self {
            // AppError::NotFound(e) => e,
            AppError::InternalServerError(e) => e,
        };
        (StatusCode::INTERNAL_SERVER_ERROR, body).into_response()
    }
}
