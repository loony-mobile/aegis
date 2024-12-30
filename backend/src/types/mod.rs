use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct OriImgMd {
    pub width: i32,
    pub height: i32,
}

#[derive(Serialize, Deserialize)]
pub struct CropImgMd {
    pub x: u32,
    pub y: u32,
    pub width: u32,
    pub height: u32,
}

#[derive(Serialize, Deserialize)]
#[allow(non_snake_case)]
pub(crate) struct ImageMetadata {
    pub oriImgMd: OriImgMd,
    pub cropImgMd: CropImgMd,
}
