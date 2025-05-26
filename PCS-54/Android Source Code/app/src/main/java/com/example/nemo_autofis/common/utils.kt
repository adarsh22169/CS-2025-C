package com.example.nemo_autofis.common

import android.Manifest
import android.net.Uri
import android.util.Log
import androidx.core.app.ActivityCompat
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.ktx.storage
import java.util.UUID

const val FISH_IMAGES_FOLDER_PATH = "Fish_images"
const val FISH_PATH = "Fish_path"

fun uploadImage(
    path: String,
    uri: Uri?,
    function: (isSuccessful: Boolean, fileUrl: String) -> Unit
) {

    if (uri != null) {
        Firebase.storage.reference.child("$path/${UUID.randomUUID()}.jpg").putFile(uri)
            .addOnCompleteListener {
                it.result.storage.downloadUrl.addOnSuccessListener {
                    function(true, it.toString())
                }

            }
            .addOnProgressListener {
                Log.d("uploadImage", " ${(it.bytesTransferred / it.totalByteCount) * 100} ")
            }
            .addOnFailureListener {

            }
    }



}