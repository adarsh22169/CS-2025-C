plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services")
    id("androidx.navigation.safeargs")
    id("com.google.android.libraries.mapsplatform.secrets-gradle-plugin")
}

android {
    namespace = "com.example.nemo_autofis"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.nemo_autofis"
        minSdk = 29
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    buildFeatures {
        viewBinding = true
        mlModelBinding = true
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {

    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("androidx.navigation:navigation-fragment-ktx:2.7.7")
    implementation("androidx.navigation:navigation-ui-ktx:2.7.7")
    implementation("org.tensorflow:tensorflow-lite-metadata:0.1.0")
    implementation("org.tensorflow:tensorflow-lite-gpu:2.3.0")
    implementation("com.google.firebase:firebase-storage-ktx:21.0.0")
    implementation("com.google.firebase:firebase-firestore:24.7.0")
//    implementation("com.google.firebase:firebase-firestore")
    implementation("com.google.android.gms:play-services-location:21.3.0")
    implementation("androidx.activity:activity:1.9.2")
    implementation("androidx.room:room-ktx:2.6.1")

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")

//    val camerax_version = “1.0.0-beta07”

// CameraX core library using camera2 implementation

    implementation("androidx.camera:camera-camera2:1.3.1")
    implementation("androidx.camera:camera-lifecycle:1.3.1")
    implementation("androidx.camera:camera-view:1.3.1")

    // Import the BoM for the Firebase platform
    implementation(platform("com.google.firebase:firebase-bom:33.2.0"))
    // Firebase Auth Dependency
    implementation("com.google.firebase:firebase-auth")


    // 2.17.0 is version of TensorFlow of model trained

    // for ML Model
    implementation("org.tensorflow:tensorflow-lite:2.13.0")
    implementation("org.tensorflow:tensorflow-lite-support:0.4.4")

//to avoid conflict bteween dependencies of camerax and firestore
    implementation("com.google.guava:guava:31.1-android")

    implementation("io.coil-kt:coil:2.7.0")



    implementation("com.google.mlkit:image-labeling:17.0.9")

    // splash screen
    implementation("androidx.core:core-splashscreen:1.0.1")

    // circle image view
    implementation("com.mikhaellopez:circularimageview:4.3.1")

    // google sign in
    implementation("com.google.android.gms:play-services-auth:20.7.0")


    //Scalable DP and SP
    implementation("com.intuit.sdp:sdp-android:1.0.6")
    implementation("com.intuit.ssp:ssp-android:1.0.6")

    // Adding GIF
    implementation("pl.droidsonroids.gif:android-gif-drawable:1.2.17")

    // Retrofit and GSON converter
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    // GSON Converter
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

}