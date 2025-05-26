package com.example.nemo_autofis

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.example.nemo_autofis.databinding.ActivityHomeSctivityBinding

class HomeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityHomeSctivityBinding
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        binding = ActivityHomeSctivityBinding.inflate(layoutInflater)
        setContentView(binding.root)


        val botview = binding.bottomNavigationView


        val navController = findNavController(R.id.fragmentContainerView)
        botview.setupWithNavController(navController)
    }
}