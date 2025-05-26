package com.example.nemo_autofis.Adapters

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.recyclerview.widget.RecyclerView.Adapter
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import coil.load
import com.example.nemo_autofis.Fish_detail
import com.example.nemo_autofis.R
import com.example.nemo_autofis.databinding.RvItemHistoryBinding
import com.example.nemo_autofis.models.FishCaptureModel

class CaptureHistoryAdapter(var context: Context, private var captureList: ArrayList<FishCaptureModel>) : Adapter<CaptureHistoryAdapter.MyViewHolder>() {

    inner class MyViewHolder(var binding: RvItemHistoryBinding) : ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        onAdapterCountListener?.onAdapterCountListener(getItemCount());
        return MyViewHolder(RvItemHistoryBinding.inflate(LayoutInflater.from(parent.context), parent, false))

    }

    override fun getItemCount(): Int {
        if(captureList.isNullOrEmpty()){
            return 0
        }else{
            return captureList.size
        }

    }

    interface OnAdapterCountListener {
        fun onAdapterCountListener(count: Int)
    }

    private var onAdapterCountListener: OnAdapterCountListener? = null
    fun setOnAdapterCountListener(l: OnAdapterCountListener?) {
        onAdapterCountListener = l
    }

fun updateProductList(list: ArrayList<FishCaptureModel>){
    captureList.clear()

        captureList.addAll(list)

    notifyDataSetChanged()
}

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val currItem = captureList.get(position)

        holder.binding.fishimage.load(currItem.fishImageUrl){
            crossfade(true)
            crossfade(500)
            placeholder(R.drawable.loader)
        }

        holder.binding.fishname.text = currItem.predictedFishName
        holder.binding.dateandtime.text = currItem.timestamp
        holder.binding.location.text = currItem.captureLocation

        holder.itemView.setOnClickListener {

            val intent = Intent(context, Fish_detail::class.java)
            intent.putExtra("name", currItem.predictedFishName)
            intent.putExtra("fishimage", currItem.fishImageUrl)
            intent.putExtra("location",currItem.captureLocation)
            intent.putExtra("captured_on",currItem.timestamp)
            intent.putExtra("coordinates", currItem.coordinates)
            intent.putExtra("pressure", currItem.pressure.toString())
            intent.putExtra("temperature", currItem.temperature.toString())
            intent.putExtra("humidity", currItem.humidity.toString())
            intent.putExtra("windspeed", currItem.wind.toString())
            holder.itemView.context.startActivity(intent)

        }

    }

}