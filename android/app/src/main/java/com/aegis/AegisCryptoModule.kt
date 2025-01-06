package com.aegiscrypto

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

    external fun helloWorld(): String

    external fun encrypt(text: String): String

    external fun decrypt(text: String): String

    @ReactMethod
    fun getHelloWorld(promise: Promise) {
        try {
            val result = helloWorld()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }


    @ReactMethod
    fun getEncrypt(text: String, promise: Promise) {
        try {
            val result = encrypt(text)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }


    @ReactMethod
    fun getDecrypt(text: String, promise: Promise) {
        try {
            val result = decrypt(text)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }
}
