extern crate jni;

use self::jni::JNIEnv;
use self::jni::objects::{JClass, JString};
use self::jni::sys::{jstring};

#[no_mangle]
pub extern "system" fn Java_com_aegiscrypto_AegisCryptoModule_helloWorld(
    env: JNIEnv,
    _class: JClass,
) -> jstring {
    let output = env.new_string("Hello from Rust!")
        .expect("Couldn't create Java string!");
    output.into_raw()
}
