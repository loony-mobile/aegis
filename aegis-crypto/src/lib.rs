extern crate libc;

use libc::c_char;
use std::ffi::CString;

#[no_mangle]
pub unsafe extern fn hello_world() -> *const c_char {
    let c_str: CString = CString::new("Hello, World!").expect("CString::new failed");
    c_str.into_raw()
}

pub mod android {
    extern crate jni;

    use self::jni::JNIEnv;
    use self::jni::objects::{JClass, JString};
    use self::jni::sys::{jstring};

    #[no_mangle]
    pub unsafe extern fn Java_com_aegis_crypto_helloWorld(env: JNIEnv, _: JClass) -> jstring {
        let output: JString<'_> = env.new_string("Hello World!").expect("Couldn't create java string!");
        output.into_raw()
    }
}
