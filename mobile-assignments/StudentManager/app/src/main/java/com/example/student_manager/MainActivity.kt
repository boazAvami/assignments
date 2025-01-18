package com.example.student_manager

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.example.student_manager.activities.StudentsListActivity
import com.example.student_manager.ui.theme.StudentManagerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Start the StudentsListActivity when MainActivity is opened
        val intent = Intent(this, StudentsListActivity::class.java)
        startActivity(intent)
        finish()  // Call finish to prevent the user from returning to MainActivity
    }
}
