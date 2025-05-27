package com.example.nemo_autofis.Fragments

import android.Manifest
import android.Manifest.permission.ACCESS_FINE_LOCATION
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.location.Address
import android.location.Geocoder
import android.location.Location
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.navigation.fragment.findNavController
import com.example.nemo_autofis.ApiInterface
import com.example.nemo_autofis.R
import com.example.nemo_autofis.common.FISH_IMAGES_FOLDER_PATH
import com.example.nemo_autofis.common.FISH_PATH
import com.example.nemo_autofis.common.uploadImage
import com.example.nemo_autofis.databinding.FragmentResultBinding
import com.example.nemo_autofis.models.FishCaptureModel
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.ktx.storage
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import com.example.nemo_autofis.data.WeatherApp
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ResultFragment : Fragment() {

    private lateinit var binding: FragmentResultBinding
    var fishCaptureModel = FishCaptureModel()
    private lateinit var fusedLocationProviderClient: FusedLocationProviderClient
    private lateinit var auth: FirebaseAuth

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        Log.d("ResultFrag", "ResultFragment onCreate called")

        binding = FragmentResultBinding.inflate(inflater, container, false)
        fusedLocationProviderClient =
            LocationServices.getFusedLocationProviderClient(requireContext())

        val args = arguments?.let { ResultFragmentArgs.fromBundle(it) }
        val label = args?.label
        val imageUri = args?.imageUri
        val uri = Uri.parse(imageUri)

        binding.imageView.setImageURI(Uri.parse(imageUri))
        fishCaptureModel.predictedFishName = label
        // saving user in data
        auth = FirebaseAuth.getInstance()
        val user = auth.currentUser?.uid
        fishCaptureModel.capturedBy = user
        uploadImage(FISH_IMAGES_FOLDER_PATH, uri) { it, imageUrl ->
            if (it) {
                fishCaptureModel.fishImageUrl = imageUrl
                fishCaptureModel.timestamp = getCurrentDate()
                binding.textView.text = label
                binding.backButton.visibility = View.VISIBLE
                binding.loader.visibility = View.GONE

                // Get the user's current location and address
                if (checkLocationPermission()) {
                    getUserLocationAndAddress()
                } else {
                    requestForPermission()
                }
            } else {
                Toast.makeText(requireContext(), "Error uploading image", Toast.LENGTH_SHORT).show()
            }
        }

        binding.backButton.setOnClickListener {

            findNavController().popBackStack()
            val bottomNavigationView = requireActivity().findViewById<BottomNavigationView>(R.id.bottomNavigationView)
            bottomNavigationView.visibility = View.VISIBLE

        }

        return binding.root
    }

    private fun checkLocationPermission(): Boolean {
        return ActivityCompat.checkSelfPermission(
            requireContext(),
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestForPermission() {
        ActivityCompat.requestPermissions(
            requireActivity(),
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
            101
        )
    }

    private fun getUserLocationAndAddress() {
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        fusedLocationProviderClient.lastLocation.addOnSuccessListener { location: Location? ->
            if (location != null) {
                getAddressFromLocation(location.latitude, location.longitude)

            } else {
                Toast.makeText(
                    requireContext(),
                    "Unable to get current location",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    private fun fetchWeatherData(latitude: Double, longitude: Double) {
        Log.d("Weather", "Fetching weather data for latitude: $latitude, longitude: $longitude")

        // Initialize Retrofit
        val retrofit = Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl("https://api.openweathermap.org/data/2.5/")
            .build()
            .create(ApiInterface::class.java)
        Log.d("Weather", "Retrofit initialized successfully")

        try {
            // Retrieve API key from metadata
            val ai: ApplicationInfo = requireContext().packageManager
                .getApplicationInfo(requireContext().packageName, PackageManager.GET_META_DATA)
            val apiKey = ai.metaData["weather_api_id"]?.toString()

            if (apiKey.isNullOrEmpty()) {
                Log.e("Weather", "API key not found in metadata")
                return
            } else {
                Log.d("Weather", "API key retrieved: $apiKey")
            }

            // Make API call
            val response = retrofit.getWeatherData(
                latitude.toString(),
                longitude.toString(),
                apiKey,
                "metric"
            )
            Log.d("Weather", "API request initialized")

            // Enqueue API call
            response.enqueue(object : Callback<WeatherApp> {
                override fun onResponse(call: Call<WeatherApp>, response: Response<WeatherApp>) {
                    if (response.isSuccessful) {
                        val responseBody = response.body()
                        Log.d("Weather", "API response received: ${responseBody.toString()}")

                        if (responseBody != null) {
                            Log.d("Weather", "Parsing response and updating fishCaptureModel")

                            fishCaptureModel.apply {
                                temperature =
                                    responseBody.main.temp  // Assigning directly as Double
                                coordinates =
                                    "${responseBody.coord.lat}, ${responseBody.coord.lon}"  // No change here
                                place = responseBody.name  // No change here
                                pressure = responseBody.main.pressure  // Assigning directly as Int
                                wind = responseBody.wind.speed  // Assigning directly as Double
                                humidity = responseBody.main.humidity  // Assigning directly as Int
                            }

                            Log.d(
                                "Weather",
                                "fishCaptureModel updated successfully: $fishCaptureModel"
                            )
                            GlobalScope.launch(Dispatchers.IO) {
                                saveFishCaptureToFirestore()
                            }

                        } else {
                            Log.e("Weather", "Response body is null")
                        }
                    } else {
                        Log.e(
                            "Weather",
                            "API response error: ${response.code()}, ${response.message()}"
                        )
                        Log.e("Weather", "Error body: ${response.errorBody()?.string()}")
                    }
                }

                override fun onFailure(call: Call<WeatherApp>, t: Throwable) {
                    Log.e("Weather", "API call failed: ${t.message}")
                }
            })
        } catch (e: Exception) {
            Log.e("Weather", "Exception occurred: ${e.message}", e)
        }
    }


    private fun getAddressFromLocation(latitude: Double, longitude: Double) {
        val geocoder = Geocoder(requireContext(), Locale.getDefault())
        try {
            val addresses: List<Address>? = geocoder.getFromLocation(latitude, longitude, 1)
            if (addresses != null && addresses.isNotEmpty()) {
                val address: Address = addresses[0]
                val addressString = buildAddressString(address)
                fishCaptureModel.captureLocation = addressString

                if (fishCaptureModel.predictedFishName != "Can't Identify..") {
                    // Save to Firestore
                    // weather ki details bhi add krne ka function banana padega
                    GlobalScope.launch(Dispatchers.IO) {
                        fetchWeatherData(latitude, longitude)
                    }

                } else {
                    Toast.makeText(context, "It will not be saved on database", Toast.LENGTH_SHORT)
                        .show()
                }
            } else {
                Log.e("Geocoding", "No address found for the location.")
            }
        } catch (e: IOException) {

            e.printStackTrace()
            Log.e("Geocoding", "Geocoder service not available.")
        }
    }

    private fun buildAddressString(address: Address): String {
        val addressLines = StringBuilder()
        for (i in 0..address.maxAddressLineIndex) {
            addressLines.append(address.getAddressLine(i)).append("\n")
        }
        return addressLines.toString()
    }

    suspend private fun saveFishCaptureToFirestore() {
        FirebaseFirestore.getInstance().collection(FISH_PATH).document()
            .set(fishCaptureModel).addOnCompleteListener {
                if (it.isSuccessful) {
//                    Toast.makeText(requireContext(), "Capture added successfully!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(
                        requireContext(),
                        "${it.exception?.localizedMessage}",
                        Toast.LENGTH_SHORT
                    ).show()
                    Log.d("Failed", "onCreate: ${it.exception?.localizedMessage}")
                }
            }
    }

    private fun getCurrentDate(): String {
        val sdf = SimpleDateFormat("yyyy-MM-dd' 'HH:mm:ss")
        return sdf.format(Date())
    }

    fun File.delete(context: Context): Boolean {
        var selectionArgs = arrayOf(this.absolutePath)
        val contentResolver = context.getContentResolver()
        var where: String? = null
        var filesUri: Uri? = null
        if (android.os.Build.VERSION.SDK_INT >= 29) {
            filesUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
            where = MediaStore.Images.Media._ID + "=?"
            selectionArgs = arrayOf(this.name)
        } else {
            where = MediaStore.MediaColumns.DATA + "=?"
            filesUri = MediaStore.Files.getContentUri("external")
        }

        val int = contentResolver.delete(filesUri!!, where, selectionArgs)

        return !this.exists()
    }

    override fun onDestroy() {
        super.onDestroy()

        Log.d("Weather", "fishCaptureModel updated successfully: $fishCaptureModel")
        // data base se uksi photo delete kr do agar "Can't identify.." wali thi toh
        if (fishCaptureModel.predictedFishName == "Can't Identify..") {
            // usko storage, database, har jagah se hta do
            val picref = fishCaptureModel.fishImageUrl
            // Create a storage reference from our app
            val storageRef = picref?.let { Firebase.storage.getReferenceFromUrl(it) }


            // Delete the file
            storageRef?.delete()?.addOnSuccessListener {
                // File deleted successfully
            }?.addOnFailureListener {
                // Uh-oh, an error occurred!
            }
        }

        // local storage se saari photos delete kr do kyunki agar kaam ki thi toh firebase mein chli gyi
        val args = arguments?.let { ResultFragmentArgs.fromBundle(it) }
        val imageUri = args?.imageUri
        val uri = Uri.parse(imageUri)

        val fileToDelete = uri.path?.let { File(it) }
        Log.e("delete", "File to Delete " + fileToDelete)
        if (fileToDelete != null) {
            if (fileToDelete.exists()) {
                if (fileToDelete.delete()) {
                    if (fileToDelete.exists()) {
                        fileToDelete.canonicalFile.delete()
                        if (fileToDelete.exists()) {

                            context?.deleteFile(fileToDelete.name)

                        }
                    }
                    Log.e("delete", "File Deleted " + uri.path)
                } else {
                    Log.e("delete", "File not Deleted " + uri.path)
                }
            }
        }

    }


}
