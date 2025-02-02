package com.aegis

import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log

class AegisCallScreeningService: CallScreeningService() {
    override fun onScreenCall(callDetails: Call.Details) {
        Log.d("CallScreeningService", "Incoming call from: ${callDetails.handle}")

        // Example: block a call from a specific number
        val phoneNumber = callDetails.handle?.schemeSpecificPart
        if (phoneNumber == "1234567890") {
            respondToCall(callDetails, CallResponse.Builder()
                .setDisallowCall(true)
                .setRejectCall(true)
                .setSkipCallLog(true)
                .setSkipNotification(true)
                .build()
            )
            Log.d("CallScreeningService", "Call rejected: $phoneNumber")
        } else {
            respondToCall(callDetails, CallResponse.Builder()
                .setDisallowCall(false)
                .setRejectCall(false)
                .build()
            )
            Log.d("CallScreeningService", "Call allowed: $phoneNumber")
        }
    }
}
