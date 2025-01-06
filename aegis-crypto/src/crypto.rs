use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Nonce, Key // Or `Aes128Gcm`
};

fn encrypt(plaintext: Vec<u8>) -> (Vec<u8>, Vec<u8>) {    
    // let key = Aes256Gcm::generate_key(OsRng);
    let key: &[u8; 32] = &[0; 32];
    let key: &Key<Aes256Gcm> = key.into();
    
    let cipher = Aes256Gcm::new(&key);
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng); // 96-bits; unique per message
    let ciphertext = cipher.encrypt(&nonce, plaintext.as_ref()).unwrap();
    (ciphertext, nonce.to_vec())
}

fn decrypt(ciphertext: Vec<u8>, nonce: Vec<u8>) -> Vec<u8> {
    // let key = Aes256Gcm::generate_key(OsRng);
    let key: &[u8; 32] = &[0; 32];
    let key: &Key<Aes256Gcm> = key.into();
    let cipher = Aes256Gcm::new(&key);
    let nonce = Nonce::from_slice(&nonce); // Use nonce from encryption

    let plaintext = cipher.decrypt(&nonce, ciphertext.as_ref()).unwrap();
    plaintext
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encrypt_decrypt() {
        let plaintext = b"Hello, RustCrypto!".to_vec();

        // Encrypt the plaintext
        let (ciphertext, nonce) = encrypt(plaintext.clone());

        // Ensure ciphertext is not empty
        assert!(!ciphertext.is_empty());

        // Decrypt the ciphertext
        let decrypted_text = decrypt(ciphertext, nonce);

        // Check if the decrypted text matches the original plaintext
        assert_eq!(decrypted_text, b"Hello, RustCrypto!".to_vec());
    }
}
