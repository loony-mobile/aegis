// AES-256-GCM (Advanced Encryption Standard with 256-bit keys in Galois/Counter Mode) 
// is a widely used encryption algorithm that provides both confidentiality and integrity. 
// It's particularly favored for its security and efficiency.

use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Nonce, Key
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use crate::error::AegisError;

#[derive(Deserialize, Serialize)]
struct EncryptedResponse {
    nonce: Vec<u8>,
    text: Vec<u8>
}

pub fn encrypt(plain_text: &str, secret_key: &str) -> Result<String, AegisError> {
    
    let slice = secret_key.as_bytes();
    let mut key: [u8; 32] = [0; 32];
    key[..slice.len()].copy_from_slice(slice);
    let aes_key: &Key<Aes256Gcm> = &key.into();
    let aes_key = Key::<Aes256Gcm>::from_slice(&aes_key);
    let cipher = Aes256Gcm::new(aes_key);

    let nonce = Aes256Gcm::generate_nonce(&mut OsRng); // 96-bits; unique per message
    let ciphertext = cipher.encrypt(&nonce, plain_text.as_ref())?;

    Ok(json!({
        "nonce": nonce.to_vec(),
        "text": ciphertext
    }).to_string())
}

pub fn decrypt(cipher_text: &str, secret_key: &str) -> Result<String, AegisError> {
    let enc: EncryptedResponse = serde_json::from_str(cipher_text)?;
    let mut key: [u8; 32] = [0; 32];
    let slice = secret_key.as_bytes();
    key[..slice.len()].copy_from_slice(slice);
    let aes_key: &Key<Aes256Gcm> = &key.into();
    let aes_key = Key::<Aes256Gcm>::from_slice(&aes_key);
    let cipher = Aes256Gcm::new(aes_key);

    let nonce = Nonce::from_slice(&enc.nonce);
    let plaintext = cipher.decrypt(&nonce, enc.text.as_ref())?;

    Ok(String::from_utf8(plaintext)?)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encrypt_decrypt() {
        let plaintext = "TEXT TO ENCRYPT!";
        let secret_key = "SECRET_KEY";

        // Encrypt the plaintext
        let ciphertext = encrypt(plaintext, secret_key).unwrap();

        // Ensure ciphertext is not empty
        assert!(!ciphertext.is_empty());

        let decrypt_text = decrypt(&ciphertext, secret_key).unwrap();

        assert_eq!(plaintext, decrypt_text);

    }
}
