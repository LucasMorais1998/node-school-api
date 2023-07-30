import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    res.json(students);
  }
}

const studentControllerInstance = new StudentController();
export default studentControllerInstance;
