package com.aegis

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class AegisCryptoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Load the Rust library
        System.loadLibrary("aegis_crypto") // Match the name of your `.so` file without the `lib` prefix
    }

    override fun getName(): String {
        return "AegisCryptoModule"
    }

    external fun greetingsV1(): String

    external fun encryptV2(plain_text: String, secret_key: String): String

    external fun decryptV2(cipher_text: String, secret_key: String): String

    @ReactMethod
    fun greetings(promise: Promise) {
        try {
            val result = greetingsV1()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }


    @ReactMethod
    fun encrypt(plain_text: String, secret_key: String, promise: Promise) {
        try {
            val result = encryptV2(plain_text, secret_key)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }


    @ReactMethod
    fun decrypt(cipher_text: String, secret_key: String, promise: Promise) {
        try {
            val result = decryptV2(cipher_text, secret_key)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }
}
