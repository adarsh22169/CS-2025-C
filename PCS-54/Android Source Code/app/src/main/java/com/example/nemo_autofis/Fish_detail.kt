package com.example.nemo_autofis

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import coil.load
import com.example.nemo_autofis.databinding.ActivityFishDetailBinding
import com.example.nemo_autofis.models.FishData
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class Fish_detail : AppCompatActivity() {

    private lateinit var db: FirebaseFirestore
    private lateinit var binding: ActivityFishDetailBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding = ActivityFishDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val fishname = intent.getStringExtra("name")

        // using coroutines, so that it can fetch data asynchronously
        lifecycleScope.launch(Dispatchers.IO) {
            // Call the API
            db = FirebaseFirestore.getInstance()

            db.collection("Fish_detail").whereEqualTo("name", fishname).get()
                .addOnSuccessListener { querySnapshot ->
                    if (!querySnapshot.isEmpty) {
                        // data fetched successfully
                        val document = querySnapshot.documents[0]
                        val fishData = document.toObject(FishData::class.java)

                        Log.d("Firestore", "Data is :" + { fishData })

                        // Use the data to update the UI
                        if (fishData != null) {

                            binding.Calories.text = fishData.calories
                            binding.TotalFat.text = fishData.totalFat
                            binding.SaturatedFat.text = fishData.saturatedFat
                            binding.Cholestrol.text = fishData.cholestrol
                            binding.Sodium.text = fishData.sodium
                            binding.Potassium.text = fishData.potassium
                            binding.TotalCarbohydrate.text = fishData.totalCarbohydrate
                            binding.Dietaryfiber.text = fishData.dietaryFiber
                            binding.Protein.text = fishData.protein

                            binding.tvKnowmore.setOnClickListener {
                                val intent = Intent(Intent.ACTION_VIEW)
                                intent.data = Uri.parse(fishData.url)
                                startActivity(intent)
                            }
                        }
                    } else {
                        Log.d("Firestore", "Fetching fish details failed ")
                    }
                }.addOnFailureListener { exception ->
                    // Handle errors
                    Log.e("Firestore", "Error getting details of fish: ", exception)

                }
        }

        // other data is being fetched by coroutine, in the mean time updating other things
        binding.fishImage.load(intent.getStringExtra("fishimage")) {
            crossfade(true)
            crossfade(500)
            placeholder(R.drawable.fishplaceholder)
        }
        binding.fishName.text = intent.getStringExtra("name")
        binding.fishLocation.text = intent.getStringExtra("location")
        binding.fishCapturedon.text = intent.getStringExtra("captured_on")
        if (intent.getStringExtra("humidity") != null) {
            binding.fishHumidity.text = intent.getStringExtra("humidity") + "%"
        } else {
            binding.fishHumidity.text = "N/A"
        }
        if (intent.getStringExtra("pressure") != null) {
            binding.fishPressure.text = intent.getStringExtra("pressure") + "hPa"
        } else {
            binding.fishPressure.text = "N/A"
        }
        if (intent.getStringExtra("wind") != null) {
            binding.fishWindspeed.text = intent.getStringExtra("wind") + " m/s"
        } else {
            binding.fishWindspeed.text = "N/A"
        }
        binding.fishCoordinates.text = intent.getStringExtra("coordinates")
        if (intent.getStringExtra("temperature") != null) {
            binding.fishTemperature.text = intent.getStringExtra("temperature") + " °C"
        } else {
            binding.fishTemperature.text = "N/A"
        }


    }

}