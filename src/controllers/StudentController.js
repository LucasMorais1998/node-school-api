import errorHandler from '../middlewares/errorHandlerMiddleware';
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
      return errorHandler(error, req, res);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ errors: ['Invalid ID format'] });
      }

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

      if (!student) {
        return res.status(400).json({ errors: ['Student not found.'] });
      }

      return res.json(student);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async store(req, res) {
    try {
      const newStudent = await Student.create(req.body);

      const { id, name, last_name, email, age, weight, height } = newStudent;

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
      return errorHandler(error, req, res);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['id is required.'] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['Student not found.'] });
      }

      const hasUpdates = Object.keys(req.body).some(
        (field) => req.body[field] !== student[field],
      );

      if (!hasUpdates) {
        return res.status(400).json({
          errors: ['No data has been modified.'],
        });
      }

      const updatedStudent = await student.update(req.body);

      const { name, last_name, email, age, weight, height } = updatedStudent;

      return res.json({
        id,
        name,
        last_name,
        email,
        age,
        weight,
        height,
      });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['id is required.'] });

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['Student not found.'] });
      }

      await student.destroy();
      return res.status(204).send();
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }
}

const studentControllerInstance = new StudentController();
export default studentControllerInstance;
