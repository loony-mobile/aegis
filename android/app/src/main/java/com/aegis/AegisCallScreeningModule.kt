package com.aegiscall

import android.content.Intent
import android.telecom.CallScreeningService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReactContextBaseJavaModule

class AegisCallScreeningModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CallScreeningModule"
    }

    @ReactMethod
    fun startService() {
        val intent = Intent(reactApplicationContext, CallScreeningService::class.java)
        reactApplicationContext.startService(intent)
    }
}