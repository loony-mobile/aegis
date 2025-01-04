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

    @ReactMethod
    fun getHelloWorld(promise: Promise) {
        try {
            val result = helloWorld()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("RUST_ERROR", e)
        }
    }
}
