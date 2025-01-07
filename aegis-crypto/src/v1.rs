extern crate jni;

// use aes::Aes256;
// use hex_literal::hex;
// use serde::{Deserialize};
use self::jni::JNIEnv;
use self::jni::objects::{JClass, JString};
use self::jni::sys::jstring;
use cipher::{
    block_padding::Pkcs7, // Padding scheme
    BlockDecryptMut, BlockEncryptMut, KeyIvInit,
};

type Aes128CbcEnc = cbc::Encryptor<aes::Aes128>;
type Aes128CbcDec = cbc::Decryptor<aes::Aes128>;
use serde_json::json;

#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_encrypt(
    mut env: JNIEnv,
    _class: JClass,
    text: JString
) -> jstring {
    let jstr: String = env.get_string(&text).unwrap().into();

    let key = [0x42; 16];
    let iv = [0x24; 16];
    let plaintext = jstr.as_bytes();
    let mut buf = [0u8; 48];
    let pt_len = plaintext.len();
    buf[..pt_len].copy_from_slice(&plaintext);
    let ct = Aes128CbcEnc::new(&key.into(), &iv.into())
        .encrypt_padded_mut::<Pkcs7>(&mut buf, pt_len)
        .unwrap();
    
    let data = json!({
        "key": key,
        "iv": iv,
        "ct": ct
    });
    
    let output = env.new_string(data.to_string())
        .expect("Couldn't create Java string!");
    output.into_raw()
}


#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_decrypt(
    mut env: JNIEnv,
    _class: JClass,
    text: JString
) -> jstring {

    let jstr: String = env.get_string(&text).unwrap().into();

    // let key = [0x42; 16];
    // let iv = [0x24; 16];
    // let mut buf = [0u8; 48];

     // For simplicity, assume the JString is a hex string representing the key, iv, and buf
    // For example: "42424242424242424242424242424224" (key) + "24242424242424242424242424242424" (iv) + "..." (buf)
    let (key_str, rest) = jstr.split_at(32); // first 32 hex chars for key (16 bytes)
    let (iv_str, buf_str) = rest.split_at(32); // next 32 hex chars for iv (16 bytes)

    // Decode the hex strings to byte arrays
    let key = hex::decode(key_str).unwrap();
    let iv = hex::decode(iv_str).unwrap();
    let buf = hex::decode(buf_str).unwrap();
    
    // Convert the Vec<u8> to fixed-size arrays
    let mut key_arr = [0u8; 16];
    let mut iv_arr = [0u8; 16];
    let mut buf_arr = [0u8; 48];
   
    // Copy the values into the fixed-size arrays
    key_arr.copy_from_slice(&key);
    iv_arr.copy_from_slice(&iv);
    buf_arr.copy_from_slice(&buf);

    let pt = Aes128CbcDec::new(&key_arr.into(), &iv_arr.into())
        .decrypt_padded_mut::<Pkcs7>(&mut buf_arr)
        .unwrap();
    let output = env.new_string(String::from_utf8(pt.to_vec()).unwrap())
        .expect("Couldn't create Java string!");
    output.into_raw()
}

#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_helloWorld(
    env: JNIEnv,
    _class: JClass,
) -> jstring {
    let output = env.new_string("Hello from Rust!")
        .expect("Couldn't create Java string!");
    output.into_raw()
}
