package com.example.student_manager.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.student_manager.models.Student
import com.example.student_manager.databinding.ItemStudentBinding

class StudentsAdapter(
    private val students: List<Student>,
    private val onItemClicked: (Int) -> Unit,
    private val onCheckboxClicked: (Int) -> Unit
) : RecyclerView.Adapter<StudentsAdapter.StudentViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StudentViewHolder {
        val binding = ItemStudentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return StudentViewHolder(binding)
    }

    override fun onBindViewHolder(holder: StudentViewHolder, position: Int) {
        val student = students[position]
        with(holder.binding) {
            tvName.text = student.name
            tvId.text = student.id
            tvPhone.text = student.phone
            tvAddress.text = student.address
            checkBox.isChecked = student.isChecked
            root.setOnClickListener { onItemClicked(position) }
            checkBox.setOnClickListener { onCheckboxClicked(position) }
        }
    }

    override fun getItemCount(): Int = students.size

    class StudentViewHolder(val binding: ItemStudentBinding) : RecyclerView.ViewHolder(binding.root)
}
