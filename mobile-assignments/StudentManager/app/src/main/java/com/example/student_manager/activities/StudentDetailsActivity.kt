package com.example.student_manager.activities

import StudentsRepository
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.student_manager.databinding.ActivityStudentDetailsBinding

class StudentDetailsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStudentDetailsBinding
    private var studentIndex: Int = -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStudentDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        studentIndex = intent.getIntExtra("studentIndex", -1)
        val student = StudentsRepository.getStudents()[studentIndex]

        // Display student details
        binding.tvName.text = "name: ${student.name}"
        binding.tvId.text = "student ID: ${student.id}"
        binding.tvPhone.text = "phone: ${student.phone}"
        binding.tvAddress.text = "address: ${student.address}"
        binding.cbCheckedBox.isChecked = student.isChecked

        // Handle "Edit Student" button click
        binding.btnEditStudent.setOnClickListener {
            val intent = Intent(this, EditStudentActivity::class.java)
            intent.putExtra("studentIndex", studentIndex)
            startActivityForResult(intent, EDIT_STUDENT_REQUEST_CODE)
        }

        binding.btnBack.setOnClickListener {
            finish()
        }
    }

    override fun onResume() {
        super.onResume()
        refreshStudentDetails() // Refresh details whenever the activity resumes
    }

    private fun refreshStudentDetails() {
        val student = StudentsRepository.getStudents()[studentIndex]
        binding.tvName.text = "name: ${student.name}"
        binding.tvId.text = "student ID: ${student.id}"
        binding.tvPhone.text = "phone: ${student.phone}"
        binding.tvAddress.text = "address: ${student.address}"
        binding.cbCheckedBox.isChecked = student.isChecked
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == EDIT_STUDENT_REQUEST_CODE && resultCode == RESULT_OK) {
            setResult(RESULT_OK) // Pass the result back to the Students List Page
            finish() // Close the Student Details Page to return to the Students List Page
        }
    }

    companion object {
        const val EDIT_STUDENT_REQUEST_CODE = 1002
    }
}
