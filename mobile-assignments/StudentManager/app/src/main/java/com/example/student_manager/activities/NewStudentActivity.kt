package com.example.student_manager.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.student_manager.databinding.ActivityNewStudentBinding
import com.example.student_manager.models.Student

class NewStudentActivity : AppCompatActivity() {

    private lateinit var binding: ActivityNewStudentBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityNewStudentBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnAdd.setOnClickListener {
            val name = binding.etName.text.toString()
            val id = binding.etId.text.toString()
            val phone = binding.etPhone.text.toString()
            val address = binding.etAddress.text.toString()
            val isChecked = binding.cbCheckedBox.isChecked

            if (name.isNotEmpty() && id.isNotEmpty()) {
                StudentsRepository.addStudent(Student(id, name, phone, address, isChecked))

                // Return result to StudentsListActivity
                setResult(RESULT_OK)
                finish()
            }
        }

        binding.btnCancel.setOnClickListener {
            finish()
        }
    }
}

