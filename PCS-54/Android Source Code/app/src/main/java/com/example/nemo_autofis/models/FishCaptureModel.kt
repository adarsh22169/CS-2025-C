package com.example.nemo_autofis.models

data class FishCaptureModel(
    var predictedFishName: String? = null,
    var timestamp: String? = null,
    var fishImageUrl: String? = null,
    var captureLocation: String? = null,
    var capturedBy: String? = null,
    var temperature: Double? = null,   // Changed to Double to store temperature values directly
    var coordinates: String? = null,
    var place: String? = null,
    var pressure: Int? = null,         // Changed to Int to store pressure values directly
    var wind: Double? = null,          // Changed to Double to store wind speed values
    var humidity: Int? = null          // Changed to Int to store humidity values directly
)

