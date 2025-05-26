package com.example.nemo_autofis.Fragments

import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.provider.CalendarContract.Colors
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TextView
import androidx.core.content.ContextCompat
import com.example.nemo_autofis.R
import com.example.nemo_autofis.databinding.FragmentAboutBinding
import com.example.nemo_autofis.fullscreen_image


private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

class About : Fragment() {

    private var param1: String? = null
    private var param2: String? = null
    private lateinit var binding: FragmentAboutBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflating the layout for this fragment
        binding = FragmentAboutBinding.inflate(layoutInflater)

        binding.sarthakLinkedinBtn.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/sarthak-t-y-a-g-i/")
            startActivity(intent)
        }
        binding.sarthakLinkedinLogo.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/sarthak-t-y-a-g-i/")
            startActivity(intent)
        }
        binding.sarthakPic.setOnClickListener {
            val intent = Intent(context, fullscreen_image::class.java)
            // Passing the image resource ID or URI to the new activity
            intent.putExtra(
                "imageResId",
                "https://firebasestorage.googleapis.com/v0/b/nemo-app-c188b.appspot.com/o/Profile_photos%2Fsarthak.png?alt=media&token=4ef76d26-1073-4554-b88d-8798e59375bd"
            )
            startActivity(intent)
        }

        binding.manvendraLinkedinBtn.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/manvendrasingh1407/")
            startActivity(intent)
        }
        binding.manvendraLinkedinLogo.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/manvendrasingh1407/")
            startActivity(intent)
        }
        binding.manvendraPic.setOnClickListener {
            val intent = Intent(context, fullscreen_image::class.java)
            // Passing the image resource ID or URI to the new activity
            intent.putExtra(
                "imageResId",
                "https://firebasestorage.googleapis.com/v0/b/nemo-app-c188b.appspot.com/o/Profile_photos%2Fmanvendra.jpg?alt=media&token=67e8f80b-3f2e-412d-8055-7181058b5077"
            )
            startActivity(intent)
        }

        binding.princeLinkedinBtn.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/prince-yadav-075346239/")
            startActivity(intent)
        }
        binding.princeLinkedinLogo.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/prince-yadav-075346239/")
            startActivity(intent)
        }
        binding.princePic.setOnClickListener {
            val intent = Intent(context, fullscreen_image::class.java)
            // Passing the image resource ID or URI to the new activity
            intent.putExtra(
                "imageResId",
                "https://firebasestorage.googleapis.com/v0/b/nemo-app-c188b.appspot.com/o/Profile_photos%2Fprince.png?alt=media&token=509c55fb-6bfb-40ca-9782-3563560706f3"
            )
            startActivity(intent)
        }

        binding.uditLinkedinBtn.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/udit-sharma-a61b4b256/")
            startActivity(intent)
        }
        binding.uditLinkedinLogo.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.linkedin.com/in/udit-sharma-a61b4b256/")
            startActivity(intent)
        }
        binding.uditPic.setOnClickListener {
            val intent = Intent(context, fullscreen_image::class.java)
            // Passing the image resource ID or URI to the new activity
            intent.putExtra(
                "imageResId",
                "https://firebasestorage.googleapis.com/v0/b/nemo-app-c188b.appspot.com/o/Profile_photos%2FUdit.jpg?alt=media&token=3ad3e634-2455-42b8-a858-1489f5811c5e"
            )
            startActivity(intent)
        }

        val fishNames = listOf(
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

        val fishTable: TableLayout = binding.FishTable
        val columnsPerRow = 2

        for (i in fishNames.indices step columnsPerRow) {
            val tableRow = TableRow(context)

            for (j in 0 until columnsPerRow) {
                val index = i + j
                if (index < fishNames.size) {
                    val cropText = TextView(context).apply {
                        text = "⦾ " + fishNames[index]
                        textSize = 16f
                        setTextColor(ContextCompat.getColor(context, R.color.theme))
                        setPadding(16, 12, 16, 12)
                    }
                    tableRow.addView(cropText)
                }
            }

            fishTable.addView(tableRow)
        }

        return binding.root
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment About.
         */

        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            About().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}