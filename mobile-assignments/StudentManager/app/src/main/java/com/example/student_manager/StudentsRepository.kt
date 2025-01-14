import com.example.student_manager.models.Student

object StudentsRepository {
    private val students = mutableListOf<Student>()

    fun addStudent(student: Student) {
        students.add(student)
    }

    fun getStudents(): List<Student> = students

    fun updateStudent(index: Int, updatedStudent: Student) {
        students[index] = updatedStudent
    }

    fun deleteStudent(index: Int) {
        students.removeAt(index)
    }
}
