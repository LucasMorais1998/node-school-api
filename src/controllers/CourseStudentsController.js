import Course from '../models/Course';
import CourseStudents from '../models/CourseStudents';
import Student from '../models/Student';

class CourseStudentsController {
  async store(req, res) {
    try {
      const { student_id, course_id } = req.body;

      if (!student_id || !course_id) return res.status(400).json({ errors: ['id\'s are required.'] });

      const student = await Student.findByPk(student_id);

      if (!student) return res.status(404).json({ errors: ['Student not found.'] });

      const course = await Course.findByPk(course_id);

      if (!course) return res.status(404).json({ errors: ['Course not found.'] });

      const enrollmentExists = await CourseStudents.findOne({
        where: {
          student_id,
          course_id,
        },
      });

      if (enrollmentExists) {
        return res.status(400).json({ errors: ['Student is already enrolled in the course.'] });
      }

      await CourseStudents.create({
        student_id,
        course_id,
      });

      return res.json(course);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
const courseStudentsControllerInstance = new CourseStudentsController();
export default courseStudentsControllerInstance;
