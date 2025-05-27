package com.example.nemo_autofis.Fragments

import android.content.ContentValues.TAG
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity.RESULT_OK
import coil.load
import com.example.nemo_autofis.Fish_detail
import com.example.nemo_autofis.MainActivity
import com.example.nemo_autofis.R
import com.example.nemo_autofis.User
import com.example.nemo_autofis.common.uploadImage
import com.example.nemo_autofis.databinding.FragmentProfileBinding
import com.example.nemo_autofis.fullscreen_image
import com.example.nemo_autofis.models.FishCaptureModel
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.AggregateSource
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query


class ProfileFragment : Fragment() {
    // declare the GoogleSignInClient
    lateinit var mGoogleSignInClient: GoogleSignInClient

    private val auth by lazy {
        FirebaseAuth.getInstance()
    }
    private lateinit var binding: FragmentProfileBinding
    private lateinit var db: FirebaseFirestore
    private val PICK_IMAGE_REQUEST = 1
    private var userphoto: String? =
        "https://firebasestorage.googleapis.com/v0/b/nemo-app-c188b.appspot.com/o/Profile_photos%2Fprofile_pic.jpg?alt=media&token=b46f9062-ea6a-42c5-8718-97c08277eeb2"


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // call requestIdToken as follows

        val ai: ApplicationInfo = requireContext().packageManager
            .getApplicationInfo(requireContext().packageName, PackageManager.GET_META_DATA)

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(ai.metaData["default_web_client_id"].toString())
            .requestEmail()
            .build()
        mGoogleSignInClient = context?.let { GoogleSignIn.getClient(it, gso) }!!

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentProfileBinding.inflate(layoutInflater)

        db = FirebaseFirestore.getInstance()

        val user = auth.currentUser
        val userId = user?.uid

        // Fetch user data from Firestore
        userId?.let {
            db.collection("users").document(it).get()
                .addOnSuccessListener { document ->
                    if (document != null) {
                        // Convert document to User object
                        val userData = document.toObject(User::class.java)
                        if (userData != null) {
                            val name = userData.name
                            val email = userData.email
                            userphoto = userData.prf_pic

                            binding.tvName.text = name
                            binding.tvEmail.text = email
                            binding.profileImage.load(userphoto)
                        }
                    }
                }
                .addOnFailureListener {
                    Toast.makeText(
                        context,
                        "Some Error Occured",
                        Toast.LENGTH_SHORT
                    ).show()
                }

            // Fetch number of Fishes caught from Firebase

            db.collection("Fish_path").whereEqualTo("capturedBy", userId).count()
                .get(AggregateSource.SERVER)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        // Count fetched successfully
                        val snapshot = task.result.count.toString()
                        binding.tvFishNum.text = snapshot
                        Log.d(TAG, "Count: ${snapshot}")

                    } else {
                        Log.d(TAG, "Count failed: ", task.getException())
                    }
                }

            db.collection("Fish_path")
                .whereEqualTo("capturedBy", userId)
                .orderBy("timestamp", Query.Direction.DESCENDING)
                .limit(1)
                .get()
                .addOnSuccessListener { querySnapshot ->
                    if (!querySnapshot.isEmpty) {
                        // Get the first document from the query result
                        binding.noCaughtYet.visibility = View.GONE
                        binding.recentCaughtCard.visibility = View.VISIBLE
                        binding.logoutPng.visibility = View.VISIBLE

                        val document = querySnapshot.documents[0]
                        val fishData = document.toObject(FishCaptureModel::class.java)

                        // Use the data to update the UI
                        if (fishData != null) {
                            binding.fishname.text = fishData.predictedFishName
                            binding.location.text = fishData.captureLocation
                            binding.dateandtime.text = fishData.timestamp
                            binding.fishimage.load(fishData.fishImageUrl) {
                                crossfade(true)
                                crossfade(100)
                                placeholder(R.drawable.loader)
                            }

                            binding.recentCaughtCard.setOnClickListener {

                                val intent = Intent(context, Fish_detail::class.java)
                                intent.putExtra("name", fishData.predictedFishName)
                                intent.putExtra("location", fishData.captureLocation)
                                intent.putExtra("captured_on", fishData.timestamp)
                                intent.putExtra("fishimage", fishData.fishImageUrl)
                                startActivity(intent)

                            }


                        }
                    } else {
                        binding.recentCaughtCard.visibility = View.GONE
                        binding.noCaughtYet.visibility = View.VISIBLE
                        binding.logoutPng.visibility = View.VISIBLE
                        // Handle the case where no documents were found
                        Log.d("Firestore", "No documents found")
                    }

                    // sabki visibility le aao
                    binding.lineardetails.visibility = View.VISIBLE
                    binding.profileImage.visibility = View.VISIBLE
                    binding.prfChange.visibility = View.VISIBLE
                    binding.loader.visibility = View.GONE
                }
                .addOnFailureListener { exception ->
                    // Handle errors
                    Log.e("Firestore", "Error getting documents: ", exception)
                    // loader ghumne do
                    Toast.makeText(context, "There is some error in fetching", Toast.LENGTH_LONG)
                        .show()
                }

        }


        binding.logoutText.setOnClickListener {

            mGoogleSignInClient.signOut().addOnCompleteListener {
                val intent = Intent(context, MainActivity::class.java)
                Toast.makeText(context, "Logging Out", Toast.LENGTH_SHORT).show()
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
            }

            FirebaseAuth.getInstance().signOut() // Log out the user
            // Create an intent to start MainActivity and clear the back stack
            val intent = Intent(context, MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            // Start MainActivity
            startActivity(intent)
        }

        binding.prfChange.setOnClickListener {
            val intent = Intent(Intent.ACTION_PICK)
            intent.type = "image/*"
            startActivityForResult(intent, PICK_IMAGE_REQUEST)
        }

        binding.profileImage.setOnClickListener {
            val intent = Intent(context, fullscreen_image::class.java)

            // Pass the image resource ID or URI to the new activity
            intent.putExtra("imageResId", userphoto)
            startActivity(intent)
        }

        return binding.root
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.data != null) {
            val imageUri: Uri? = data.data
            binding.profileImage.setImageURI(imageUri)

            // Profile photo ko bhi save kra lo
            uploadImage("Profile_photos", imageUri)
            { it, imageUrl ->
                if (it) {


                    db = FirebaseFirestore.getInstance()

                    val user = auth.currentUser
                    val userId = user?.uid
                    userId?.let {
                        db.collection("users").document(it).update("prf_pic", imageUrl)
                            .addOnSuccessListener {
                                Log.d(
                                    TAG,
                                    "DocumentSnapshot successfully updated!"
                                )
                            }
                            .addOnFailureListener { e -> Log.w(TAG, "Error updating document", e) }

                    }
                } else {
                    Toast.makeText(context, "Error uploading image", Toast.LENGTH_SHORT).show()
                }
            }
        }

    }


}