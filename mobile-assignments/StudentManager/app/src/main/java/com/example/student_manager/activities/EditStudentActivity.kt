package com.example.student_manager.activities

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.student_manager.databinding.ActivityEditStudentBinding

class EditStudentActivity : AppCompatActivity() {

    private lateinit var binding: ActivityEditStudentBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEditStudentBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val index = intent.getIntExtra("studentIndex", -1)
        val student = StudentsRepository.getStudents()[index]

        binding.etName.setText(student.name)
        binding.etId.setText(student.id)
        binding.etPhone.setText(student.phone)
        binding.etAddress.setText(student.address)
        binding.cbCheckedBox.isChecked = student.isChecked

        binding.btnSave.setOnClickListener {
            student.name = binding.etName.text.toString()
            student.id = binding.etId.text.toString()
            student.phone = binding.etPhone.text.toString()
            student.address = binding.etAddress.text.toString()
            student.isChecked = binding.cbCheckedBox.isChecked
            StudentsRepository.updateStudent(index, student)
            finish()
        }

        binding.btnDelete.setOnClickListener {
            StudentsRepository.deleteStudent(index)
            startActivity(Intent(this, StudentsListActivity::class.java))
        }

        binding.btnCancel.setOnClickListener {
            finish()
        }
    }
}
