package com.example.student_manager.activities

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.student_manager.adapters.StudentsAdapter
import com.example.student_manager.databinding.ActivityStudentsListBinding
import com.example.student_manager.models.Student

class StudentsListActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStudentsListBinding
    private lateinit var adapter: StudentsAdapter
    private var students = mutableListOf<Student>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStudentsListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        students = StudentsRepository.getStudents().toMutableList()
        adapter = StudentsAdapter(students,
            onItemClicked = { index ->
                val intent = Intent(this, StudentDetailsActivity::class.java)
                intent.putExtra("studentIndex", index)
                startActivity(intent)
            },
            onCheckboxClicked = { index ->
                students[index].isChecked = !students[index].isChecked
                adapter.notifyItemChanged(index) // Notify the adapter of the change
            }
        )

        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = adapter

        binding.btnAddStudent.setOnClickListener {
            startActivityForResult(Intent(this, NewStudentActivity::class.java), ADD_STUDENT_REQUEST_CODE)
        }
    }

    // Override onActivityResult to handle the result and refresh the list
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == ADD_STUDENT_REQUEST_CODE && resultCode == RESULT_OK) {
            val newStudent = StudentsRepository.getStudents().last()
            students.add(newStudent)
            adapter.notifyItemInserted(students.size - 1) // Notify the adapter to add the new student
        }
    }

    companion object {
        const val ADD_STUDENT_REQUEST_CODE = 1001
    }
}
