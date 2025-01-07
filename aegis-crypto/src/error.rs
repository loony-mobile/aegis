#[derive(Debug)]
pub struct AegisError {
    pub message: String
}

impl From<serde_json::Error> for AegisError {
    fn from(value: serde_json::Error) -> Self {
        AegisError { message: value.to_string() }
    }
}

impl From<std::io::Error> for AegisError {
    fn from(value: std::io::Error) -> Self {
        AegisError { message: value.to_string() }
    }
}

impl From<aes_gcm::Error> for AegisError {
    fn from(value: aes_gcm::Error) -> Self {
        AegisError { message: value.to_string() }
    }
}

impl From<std::string::FromUtf8Error> for AegisError {
    fn from(value: std::string::FromUtf8Error) -> Self {
        AegisError { message: value.to_string() }
    }
}

impl From<hex::FromHexError> for AegisError {
    fn from(value: hex::FromHexError) -> Self {
        AegisError { message: value.to_string() }
    }
}