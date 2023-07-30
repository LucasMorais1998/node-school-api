/* eslint-disable camelcase */
import Student from '../models/Student';

class StudentController {
  async show(req, res) {
    try {
      const { id } = await req.params;

      if (!id) return res.status(400).json({ errors: ['É necessário um ID.'] });

      const student = await Student.findByPk(id);

      if (!student) return res.status(400).json({ errors: ['Aluno não encontrado.'] });

      const {
        name, last_name, email, age, weight, height,
      } = student;

      return res.json(
        {
          id, name, last_name, email, age, weight, height,
        },
      );
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

const studentControllerInstance = new StudentController();
export default studentControllerInstance;
