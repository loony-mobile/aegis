mod v2;
mod v1;

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
    let encrypt_text: String = env.get_string(&encrypt_text).unwrap().into();
    let secret_key: String = env.get_string(&secret_key).unwrap().into();

    let ciphertext = v2::encrypt(&encrypt_text, &secret_key);
    let output = env.new_string(ciphertext)
        .expect("Couldn't create Java string!");
    output.into_raw()
}


#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_decryptV2(
    mut env: JNIEnv,
    _class: JClass,
    encrypt_text: JString,
    secret_key: JString,
) -> jstring {

    let encrypt_text: String = env.get_string(&encrypt_text).unwrap().into();
    let secret_key: String = env.get_string(&secret_key).unwrap().into();

    let deciphered_text = v2::decrypt(&encrypt_text, &secret_key);

    let output = env.new_string(deciphered_text)
        .expect("Couldn't create Java string!");
    output.into_raw()
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
