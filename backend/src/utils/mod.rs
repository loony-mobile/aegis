pub mod doc;

use crate::error::AppError;
use crate::types::ImageMetadata;
use tower_sessions::Session;

pub trait GetUserId {
    async fn get_user_id(&self) -> Result<i32, AppError>;
}

impl GetUserId for Session {
    async fn get_user_id(&self) -> Result<i32, AppError> {
        let user_id: i32 = match self.get("AUTH_USER_ID").await {
            Ok(x) => match x {
                Some(x) => x,
                None => {
                    return Err(AppError::InternalServerError(
                        "User session not found".to_string(),
                    ))
                }
            },
            Err(e) => return Err(AppError::InternalServerError(e.to_string())),
        };
        Ok(user_id)
    }
}

pub fn new_height(img_metadata: &ImageMetadata) -> u32 {
    let new_width_percent =
        ((img_metadata.cropImgMd.width - 340) * 100) / img_metadata.cropImgMd.width;
    let new_height = img_metadata.cropImgMd.height / 100 * new_width_percent;
    new_height
}
