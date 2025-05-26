package com.example.nemo_autofis

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.text.InputType
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.example.nemo_autofis.databinding.ActivityMainBinding
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.auth.ktx.auth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.ktx.Firebase

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore
    private lateinit var mGoogleSignInClient: GoogleSignInClient

    companion object {
        const val REQ_CODE = 123
    }

    override fun onStart() {
        super.onStart()
        val currentUser = FirebaseAuth.getInstance().currentUser
        if (currentUser != null) {
            // User is signed in (email/password or Google)
            startActivity(Intent(this, HomeActivity::class.java))
            finish()
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        requestForPermission()
        auth = Firebase.auth
        db = FirebaseFirestore.getInstance()

        val appInfo: ApplicationInfo = applicationContext.packageManager
            .getApplicationInfo(applicationContext.packageName, PackageManager.GET_META_DATA)

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(appInfo.metaData["default_web_client_id"].toString())
            .requestEmail()
            .build()

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)

        // Email/Password login
        binding.loginBtn.setOnClickListener {
            handleEmailPasswordLogin()
        }

        // Google Sign-In
        binding.loginWithGoogleBtn.setOnClickListener {
            signInGoogle()
        }

        binding.signupBtn.setOnClickListener {
            startActivity(Intent(this, SignUpActivity::class.java))
        }

        // Reset Password
        binding.forgotPasswordTv.setOnClickListener {
            val email = binding.emailEt.text.toString().trim()

            if (email.isEmpty()) {
                binding.emailEt.error = "Enter your registered email"
                return@setOnClickListener
            }

            FirebaseAuth.getInstance().sendPasswordResetEmail(email)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        AlertDialog.Builder(this)
                            .setTitle("Password Reset Email Sent")
                            .setMessage("Check your inbox to reset your password.")
                            .setPositiveButton("OK", null)
                            .show()
                    } else {
                        AlertDialog.Builder(this)
                            .setTitle("Error")
                            .setMessage("Failed to send reset email: ${task.exception?.message}")
                            .setPositiveButton("OK", null)
                            .show()
                    }
                }
        }


        // for password toggle

        val passwordEt = binding.passwordEt

        var isPasswordVisible = false

        passwordEt.setOnTouchListener { v, event ->
            if (event.action == MotionEvent.ACTION_UP) {
                val drawableEnd = 2 // Index for drawableEnd
                val drawable = passwordEt.compoundDrawables[drawableEnd]
                if (drawable != null &&
                    event.rawX >= (passwordEt.right - drawable.bounds.width() - passwordEt.paddingEnd)) {

                    // Toggle password visibility
                    isPasswordVisible = !isPasswordVisible
                    if (isPasswordVisible) {
                        passwordEt.inputType = InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
                        passwordEt.setCompoundDrawablesWithIntrinsicBounds(0, 0, R.drawable.ic_eye_open, 0)
                    } else {
                        passwordEt.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
                        passwordEt.setCompoundDrawablesWithIntrinsicBounds(0, 0, R.drawable.ic_eye_closed, 0)
                    }

                    passwordEt.setSelection(passwordEt.text.length)

                    // ⚠️ Accessibility fix
                    v.performClick()

                    return@setOnTouchListener true
                }
            }
            false
        }

    }

    private fun signInGoogle() {
        val signInIntent: Intent = mGoogleSignInClient.signInIntent
        startActivityForResult(signInIntent, REQ_CODE)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == REQ_CODE) {
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleGoogleSignInResult(task)
        }
    }

    private fun handleGoogleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account: GoogleSignInAccount? = completedTask.getResult(ApiException::class.java)
            if (account != null) {
                authenticateWithFirebase(account)
            }
        } catch (e: ApiException) {
            Toast.makeText(this, "Google Sign-In failed: ${e.message}", Toast.LENGTH_SHORT).show()
            Log.e("GoogleSignIn", "Google Sign-In error: ${e.message}", e)
        }
    }

    private fun authenticateWithFirebase(account: GoogleSignInAccount) {
        val credential = GoogleAuthProvider.getCredential(account.idToken, null)
        auth.signInWithCredential(credential).addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val user = auth.currentUser
                user?.let {
                    saveUserToFirestore(
                        it.uid,
                        User(
                            name = account.displayName,
                            email = account.email,
                            prf_pic = account.photoUrl?.toString()
                        )
                    )
                }
                navigateToHome()
            } else {
                Toast.makeText(
                    this,
                    "Authentication Failed: ${task.exception?.message}",
                    Toast.LENGTH_SHORT
                ).show()
                Log.e("Auth", "Firebase Authentication error: ${task.exception?.message}")
            }
        }
    }

    private fun saveUserToFirestore(uid: String, user: User) {
        val userDocument = db.collection("users").document(uid)
        userDocument.get().addOnSuccessListener { document ->
            if (!document.exists()) {
                // If user doesn't exist in Firestore, add them
                userDocument.set(user)
                    .addOnSuccessListener {
                        Log.d("Firestore", "User added to Firestore successfully")
                    }
                    .addOnFailureListener { e ->
                        Toast.makeText(
                            this,
                            "Failed to add user to Firestore: ${e.message}",
                            Toast.LENGTH_SHORT
                        ).show()
                        Log.e("Firestore", "Error adding user to Firestore", e)
                    }
            } else {
                Log.d("Firestore", "User already exists in Firestore")
            }
        }.addOnFailureListener { e ->
            Toast.makeText(this, "Error fetching user document: ${e.message}", Toast.LENGTH_SHORT)
                .show()
            Log.e("Firestore", "Error checking user existence", e)
        }
    }

    private fun navigateToHome() {
        startActivity(Intent(this, HomeActivity::class.java))
        finish()
    }

    private fun handleEmailPasswordLogin() {
        binding.apply {
            val email = emailEt.text.toString()
            val password = passwordEt.text.toString()

            if (email.isEmpty()) {
                emailEt.error = "Please fill your Email ID"
                return
            }

            if (password.isEmpty()) {
                passwordEt.error = "Please fill your Password"
                return
            }

            loader.visibility = View.VISIBLE
            auth.signInWithEmailAndPassword(email, password).addOnCompleteListener { task ->
                loader.visibility = View.GONE
                if (task.isSuccessful) {
                    navigateToHome()
                } else {
                    Toast.makeText(
                        this@MainActivity,
                        "Login failed: ${task.exception?.message}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    private fun requestForPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ),
            100
        )
    }
}
