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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == ADD_STUDENT_REQUEST_CODE && resultCode == RESULT_OK) {
            refreshStudentsList()
        }
    }

    override fun onResume() {
        super.onResume()
        refreshStudentsList() // Refresh details whenever the activity resumes
    }

    private fun refreshStudentsList() {
        students.clear() // Clear the existing list
        students.addAll(StudentsRepository.getStudents()) // Reload from the repository
        adapter.notifyDataSetChanged() // Notify the adapter that the data set has changed
    }

    companion object {
        const val ADD_STUDENT_REQUEST_CODE = 1001
    }
}
