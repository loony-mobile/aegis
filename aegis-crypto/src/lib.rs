mod v2;
mod v1;
mod error;

extern crate jni;

use self::jni::JNIEnv;
use self::jni::objects::{JClass, JString};
use self::jni::sys::jstring;

#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_encryptV2(
    mut env: JNIEnv,
    _class: JClass,
    encrypt_text: JString,
    secret_key: JString
) -> jstring {
    // Helper function to throw exceptions
    fn throw_java_exception(env: &mut JNIEnv, message: &str) {
        let exception_class = "java/lang/Exception"; // Replace with specific exception class if needed
        env.throw_new(exception_class, message).expect("Failed to throw Java exception");
    }
    
    let encrypt_text: String = match env.get_string(&encrypt_text) {
        Ok(text) => text.into(),
        Err(_) => {
            throw_java_exception(&mut env, "Failed to read encrypt_text string from Java.");
            return std::ptr::null_mut();
        }
    };

    let secret_key: String = match env.get_string(&secret_key) {
        Ok(text) => text.into(),
        Err(_) => {
            throw_java_exception(&mut env, "Failed to read secret_key string from Java.");
            return std::ptr::null_mut();
        }
    };

    // Perform encryption
    let ciphertext = match v2::encrypt(&encrypt_text, &secret_key) {
        Ok(result) => result,
        Err(err) => {
            throw_java_exception(&mut env, &format!("Encryption failed: {}", err.message));
            return std::ptr::null_mut();
        }
    };

    match env.new_string(ciphertext) {
        Ok(output) => output.into_raw(),
        Err(_) => {
            throw_java_exception(&mut env, "Failed to create Java string for the ciphertext.");
            std::ptr::null_mut()
        }
    }
}


#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_decryptV2(
    mut env: JNIEnv,
    _class: JClass,
    cipher_text: JString,
    secret_key: JString,
) -> jstring {

    // Helper function to throw exceptions
    fn throw_java_exception(env: &mut JNIEnv, message: &str) {
        let exception_class = "java/lang/Exception"; // Replace with specific exception class if needed
        env.throw_new(exception_class, message).expect("Failed to throw Java exception");
    }
    
    let cipher_text: String = match env.get_string(&cipher_text) {
        Ok(text) => text.into(),
        Err(_) => {
            throw_java_exception(&mut env, "Failed to read encrypt_text string from Java.");
            return std::ptr::null_mut();
        }
    };

    let secret_key: String = match env.get_string(&secret_key) {
        Ok(text) => text.into(),
        Err(_) => {
            throw_java_exception(&mut env, "Failed to read secret_key string from Java.");
            return std::ptr::null_mut();
        }
    };

    let deciphered_text = match v2::decrypt(&cipher_text, &secret_key) {
        Ok(result) => result,
        Err(err) => {
            throw_java_exception(&mut env, &format!("Encryption failed: {}", err.message));
            return std::ptr::null_mut();
        }
    };

    match env.new_string(deciphered_text) {
        Ok(output) => output.into_raw(),
        Err(_) => {
            throw_java_exception(&mut env, "Failed to create Java string for the ciphertext.");
            std::ptr::null_mut()
        }
    }
}

#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_greetingsV1(
    env: JNIEnv,
    _class: JClass,
) -> jstring {
    let output = env.new_string("Hello! Welcome to Aegis.")
        .expect("Couldn't create Java string!");
    output.into_raw()
}
