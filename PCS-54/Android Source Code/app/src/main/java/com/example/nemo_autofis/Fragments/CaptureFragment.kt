package com.example.nemo_autofis.Fragments

// For ML Models
import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.camera.core.CameraControl
import androidx.camera.core.CameraInfo
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.nemo_autofis.R
import com.example.nemo_autofis.databinding.FragmentCaptureBinding
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.label.ImageLabeling
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions
import org.tensorflow.lite.Interpreter
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.MappedByteBuffer
import java.nio.channels.FileChannel
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class CaptureFragment : Fragment() {
    private lateinit var binding: FragmentCaptureBinding
    private var imageCapture: ImageCapture? = null
    private lateinit var outputDirectory: File
    private lateinit var cameraExecutor: ExecutorService


    // For ML Model
    private lateinit var tflite: Interpreter
    private var modelLoaded: Boolean = false
    private lateinit var cameraControl: CameraControl
    private lateinit var cameraInfo: CameraInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }


    @Throws(IOException::class)
    private fun loadModelFile(): MappedByteBuffer {
        return try {
            val assetFileDescriptor = requireContext().assets.openFd("model.tflite")
            val inputStream = FileInputStream(assetFileDescriptor.fileDescriptor)
            val fileChannel = inputStream.channel
            val startOffset = assetFileDescriptor.startOffset
            val declaredLength = assetFileDescriptor.declaredLength
            fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength)
        } catch (e: IOException) {
            Log.e(TAG, "Error loading model file: ${e.message}")
            throw e
        }
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        Log.d(TAG, "CaptureFragment onCreate called")
        binding = FragmentCaptureBinding.inflate(layoutInflater)
        if (allPermissionsGranted()) {
            startCamera()
        } else {
            ActivityCompat.requestPermissions(
                requireActivity(),
                REQUIRED_PERMISSIONS,
                REQUEST_CODE_PERMISSIONS
            )
            startCamera()
        }

        binding.cameraCaptureButton.setOnClickListener {
            binding.laoder.visibility = View.VISIBLE
            binding.flashlight.visibility = View.GONE
            binding.cameraCaptureButton.visibility = View.GONE
            binding.photoUpload.visibility = View.GONE
            val bnview =
                requireActivity().findViewById<BottomNavigationView>(R.id.bottomNavigationView)
            bnview.visibility = View.GONE
            takePhoto()
        }

        // to upload photo from storage
        binding.photoUpload.setOnClickListener {
            openGallery()
        }

        // to turn on off flashlight
        binding.flashlight.setOnClickListener {
            if (cameraInfo.torchState.value == 0) {
                cameraControl.enableTorch(true)
                binding.flashlight.setImageResource(R.drawable.flashlight_on)
            }// enable torch
            else {
                cameraControl.enableTorch(false) // disbale torch
                binding.flashlight.setImageResource(R.drawable.flashlight_off)
            }
        }
        outputDirectory = getOutputDirectory()
        cameraExecutor = Executors.newSingleThreadExecutor()

        // Load the model after the view is created
        binding.root.post { loadModel() }
        return binding.root
    }

    // for loading the ML model after View is created
    private fun loadModel() {
        // Ensure the model is loaded only once
        if (!modelLoaded) {
            try {
                tflite = Interpreter(loadModelFile())
                modelLoaded = true
                Log.d(TAG, "Model loaded successfully")
            } catch (e: IOException) {
                e.printStackTrace()
                Toast.makeText(requireContext(), "Error loading model", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun openGallery() {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        galleryResultLauncher.launch(intent)
    }

    private val galleryResultLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val data: Intent? = result.data
                val selectedImageUri: Uri? = data?.data
                if (selectedImageUri != null) {
                    processSelectedImage(selectedImageUri)


                } else {
                    Toast.makeText(requireContext(), "Error loading image", Toast.LENGTH_SHORT)
                        .show()
                }
            }
        }

    private fun processSelectedImage(imageUri: Uri) {
        try {
            val bitmap = loadImageFromUri(imageUri)

            //mlkit image classification
            val image: InputImage = try {

                Log.d("labeller", "processSelectedImage: imagefound")
                InputImage.fromFilePath(requireContext(), imageUri)

            } catch (e: IOException) {
                e.printStackTrace()
                Log.d("labeller", "processSelectedImage: imageexception")
                return  // Exit the function if an error occurs
            }
            val labeler = ImageLabeling.getClient(ImageLabelerOptions.DEFAULT_OPTIONS)



            labeler.process(image)
                .addOnSuccessListener { labels ->
                    Log.d("labeller", "processSelectedImage: $labels")
                    var flag = false;
                    for (label in labels) {
                        val text = label.text
                        Log.d("testmlkit", "processSelectedImage: $text")
                        if ((text == "Food" || text == "Insect" || text == "Bird") && label.text.isNotEmpty()) {
                            flag = true
                            break
                        }
                    }

                    val preprocessedImage = preprocessImage(bitmap)
                    val output = runInference(preprocessedImage)
                    val label: String
                    if (flag) {
                        label = interpretOutput(output)
                    } else {
                        label = "Can't Identify.."
                    }

                    navigateToResultScreen(imageUri, label)

                }
                .addOnFailureListener { e ->
                    // Task failed with an exception
                    // ...
                    Log.d("labeller", "processSelectedImage: failed")

                }

        } catch (e: Exception) {
            Log.e(TAG, "Error during processing: ${e.message}")
            Toast.makeText(requireContext(), "Error during processing", Toast.LENGTH_SHORT).show()
        }
    }

    private fun takePhoto() {
        val imageCapture = imageCapture ?: return

        val photoFile = File(
            outputDirectory,
            SimpleDateFormat(FILENAME_FORMAT, Locale.US).format(System.currentTimeMillis()) + ".jpg"
        )

        val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()

        imageCapture.takePicture(
            outputOptions,
            ContextCompat.getMainExecutor(requireContext()),
            object : ImageCapture.OnImageSavedCallback {
                override fun onError(exc: ImageCaptureException) {
                    Log.e(TAG, "Photo capture failed: ${exc.message}", exc)
                }

                override fun onImageSaved(output: ImageCapture.OutputFileResults) {
                    val savedUri = Uri.fromFile(photoFile)
                    Log.d(TAG, "Photo saved at: $savedUri")

                    try {
                        // Load the image from the saved URI
                        Log.d(TAG, "Loading image from URI")
                        processSelectedImage(savedUri)
                    } catch (e: Exception) {
                        Log.e(TAG, "Error during processing: ${e.message}")
                    }
                }
            }
        )
    }

    private fun loadImageFromUri(uri: Uri): Bitmap {
        val inputStream = requireContext().contentResolver.openInputStream(uri)
        return BitmapFactory.decodeStream(inputStream)
    }

    private fun preprocessImage(bitmap: Bitmap): ByteBuffer {
        val resizedBitmap = Bitmap.createScaledBitmap(bitmap, 224, 224, true)
        val buffer = ByteBuffer.allocateDirect(1 * 224 * 224 * 3 * 4).order(ByteOrder.nativeOrder())

        for (y in 0 until 224) {
            for (x in 0 until 224) {
                val pixel = resizedBitmap.getPixel(x, y)
                // Normalize and put the pixel values into the buffer
                buffer.putFloat((pixel shr 16 and 0xFF) / 255.0f) // Red
                buffer.putFloat((pixel shr 8 and 0xFF) / 255.0f)  // Green
                buffer.putFloat((pixel and 0xFF) / 255.0f)        // Blue
            }
        }
        return buffer
    }

    private fun runInference(input: ByteBuffer): FloatArray {
        // Get the output tensor shape and size
        val outputTensorIndex = 0
        val outputShape = tflite.getOutputTensor(outputTensorIndex).shape()

        Log.d(TAG, "Output tensor shape: ${outputShape.joinToString(", ")}")

        val outputSize = outputShape.reduce { acc, i -> acc * i }

        // Ensure that outputSize is 18 for 18 classes
        if (outputSize != 18) {
            Log.d(TAG, "Expected output size of 18, but got $outputSize. Check the model.")
        }

        // Allocate buffer according to output size
        val outputBuffer = ByteBuffer.allocateDirect(outputSize * 4).order(ByteOrder.nativeOrder())

        // Run inference
        tflite.run(input, outputBuffer)

        // Read output data into the FloatArray
        outputBuffer.rewind()
        val output = FloatArray(outputSize)
        for (i in output.indices) {
            output[i] = outputBuffer.float
        }

        return output
    }


    private fun printOutput(output: FloatArray) {
        output.forEachIndexed { index, value ->
            Log.d(TAG, "Class $index: $value")
        }
    }

    private fun interpretOutput(output: FloatArray): String {

        val labels = listOf(
            "Bangda",               //00
            "Bhetki",               //01
            "Bombay Duck",          //02
            "Eel",                  //03
            "Hilsa",                //04
            "India Basa",           //05
            "Indian Anchovy",       //06
            "Indian Oil Sardine",   //07
            "Indian Salmon",        //08
            "Mackarel",             //09
            "Mangrove Red Snapper", //10
            "Milkfish",             //11
            "Pangas Catfish",       //12
            "Pearl Spot",           //13
            "Pink Perch",           //14
            "Pomfret",              //15
            "Rohu",                 //16
            "Sardine",              //17
            "Tengra",               //18
            "Tilapia",              //19
            "Tuna"                  //20
        )
        // 22 classes including GT classes
        printOutput(output)  // to test for all output results

        val maxIndex = output.indices.maxByOrNull { output[it] } ?: -1
        return labels[maxIndex]
    }

    private fun navigateToResultScreen(imageUri: Uri, label: String) {
        Log.d(TAG, "Navigating with imageUri: $imageUri and label: $label")
        val action = CaptureFragmentDirections.actionCaptureFragmentToResultFragment(
            imageUri.toString(), label
        )
        findNavController().navigate(action)
    }


    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(requireContext())

        cameraProviderFuture.addListener({

            // Used to bind the lifecycle of cameras to the lifecycle owner
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            val viewFinder = view?.findViewById<PreviewView>(R.id.viewFinder)
            // Preview
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(viewFinder?.surfaceProvider)
                }

            imageCapture = ImageCapture.Builder().build()

            // Select back camera as a default
            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                // Unbind use cases before rebinding
                cameraProvider.unbindAll()

                // Bind use cases to camera
                val camera = cameraProvider.bindToLifecycle(
                    this, cameraSelector, preview, imageCapture
                )

                cameraInfo = camera.cameraInfo
                cameraControl = camera.cameraControl


            } catch (exc: Exception) {
                Log.e(TAG, "Use case binding failed", exc)
            }


        }, ContextCompat.getMainExecutor(requireContext()))
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(requireContext(), it) == PackageManager.PERMISSION_GRANTED
    }

    // creates a folder inside internal storage
    private fun getOutputDirectory(): File {

        val mediaDir = context?.externalMediaDirs?.firstOrNull()?.let {
            File(it, resources.getString(R.string.app_name)).apply { mkdirs() }
        }
        return if (mediaDir != null && mediaDir.exists())
            mediaDir else context?.filesDir!!
    }

    // checks the camera permission
    @Deprecated("Deprecated in Java")
    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<String>, grantResults:
        IntArray
    ) {
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            // If all permissions granted , then start Camera
            if (allPermissionsGranted()) {
                startCamera()
            } else {
                // If permissions are not granted,
                // present a toast to notify the user that
                // the permissions were not granted.
                Toast.makeText(requireContext(), "Permission not granted", Toast.LENGTH_SHORT)
                    .show()

            }
        }
    }

    companion object {
        private const val TAG = "CameraX"
        private const val FILENAME_FORMAT = "yyyy-MM-dd-HH-mm-ss-SSS"
        private const val REQUEST_CODE_PERMISSIONS = 20
        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
    }

    override fun onResume() {
        super.onResume()
        Log.d(TAG, "CaptureFragment onResume called")
    }

    override fun onViewStateRestored(savedInstanceState: Bundle?) {
        super.onViewStateRestored(savedInstanceState)
        val bnview = requireActivity().findViewById<BottomNavigationView>(R.id.bottomNavigationView)
        bnview.visibility = View.VISIBLE
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }

}