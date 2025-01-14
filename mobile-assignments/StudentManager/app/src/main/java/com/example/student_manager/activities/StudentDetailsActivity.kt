package com.example.student_manager.activities


import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.student_manager.databinding.ActivityStudentDetailsBinding
class StudentDetailsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStudentDetailsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStudentDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val index = intent.getIntExtra("studentIndex", -1)
        val student = StudentsRepository.getStudents()[index]

        // Display student details
        binding.tvName.text = student.name
        binding.tvId.text = student.id
        binding.tvPhone.text = student.phone
        binding.tvAddress.text = student.address

        // Handle "Edit Student" button click
        binding.btnEditStudent.setOnClickListener {
            val intent = Intent(this, EditStudentActivity::class.java)
            intent.putExtra("studentIndex", index) // Pass the index to EditStudentActivity
            startActivityForResult(intent, EDIT_STUDENT_REQUEST_CODE)
        }
    }

    companion object {
        const val EDIT_STUDENT_REQUEST_CODE = 1002
    }
}
