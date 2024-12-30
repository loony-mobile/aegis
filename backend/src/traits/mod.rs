use crate::error::AppError;
use serde::{Deserialize, Serialize};
use std::fs;

pub trait MoveImages {
    fn move_images(
        &self,
        file_upload_tmp: &str,
        file_upload_doc: &str,
        user_id: i32,
        project_id: i32,
    ) -> Result<(), AppError>;
}

#[derive(Deserialize, Serialize)]
pub struct Images {
    pub name: String,
}

impl MoveImages for Vec<Images> {
    fn move_images(
        &self,
        file_upload_tmp: &str,
        file_upload_doc: &str,
        user_id: i32,
        project_id: i32,
    ) -> Result<(), AppError> {
        let images = [1420, 720, 340];
        let mut iter_images = self.iter();
        let project_path = format!("{}/{}", file_upload_doc, project_id);

        if !std::path::Path::new(&project_path).exists() {
            fs::create_dir(&project_path)?;
        }

        while let Some(image) = iter_images.next() {
            for dimensions in images.iter() {
                let source_path = format!(
                    "{}/{}/{}-{}",
                    file_upload_tmp, user_id, dimensions, image.name
                );
                let destination_path = format!(
                    "{}/{}/{}-{}",
                    file_upload_doc, project_id, dimensions, image.name
                );

                fs::rename(&source_path, &destination_path)?;
            }
        }

        Ok(())
    }
}
