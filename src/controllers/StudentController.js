/* eslint-disable camelcase */
import Photo from '../models/Photo';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: [
          'id',
          'name',
          'last_name',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [['id', 'DESC']],
        include: {
          model: Photo,
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      });

      if (students.length === 0) return res.status(204).json([]);

      return res.json(students);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = await req.params;

      if (!id) return res.status(400).json({ errors: ['É necessário um ID.'] });

      const student = await Student.findByPk(id, {
        attributes: [
          'id',
          'name',
          'last_name',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [['id', 'DESC']],
        include: {
          model: Photo,
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      });

      if (!student) return res.status(400).json({ errors: ['Aluno não encontrado.'] });

      return res.json(student);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const newStudent = await Student.create(req.body);

      const {
        id,
        name,
        last_name,
        email,
        age,
        weight,
        height,
      } = newStudent;

      return res.status(201).json({
        id,
        name,
        last_name,
        email,
        age,
        weight,
        height,
      });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = await req.params;

      if (!id) {
        return res.status(400).json({ errors: ['É necessário um ID.'] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['Aluno não encontrado.'] });
      }

      const hasUpdates = Object.keys(req.body).some(
        (field) => req.body[field] !== student[field],
      );

      if (!hasUpdates) {
        return res.status(400).json({
          errors: ['Nenhum dado foi modificado.'],
        });
      }

      const updatedStudent = await student.update(req.body);

      const {
        name,
        last_name,
        email,
        age,
        weight,
        height,
      } = updatedStudent;

      return res.json(
        {
          id,
          name,
          last_name,
          email,
          age,
          weight,
          height,
        },
      );
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = await req.params;

      if (!id) return res.status(400).json({ errors: ['É necessário um ID.'] });

      const student = await Student.findByPk(id);

      if (!student) return res.status(400).json({ errors: ['Aluno não encontrado.'] });

      await student.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

const studentControllerInstance = new StudentController();
export default studentControllerInstance;
