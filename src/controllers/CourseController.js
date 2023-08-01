import Course from '../models/Course';

class CourseController {
  async index(req, res) {
    try {
      return res.json('ok');
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

      const course = await Course.findByPk(id);

      if (!course) return res.status(400).json({ errors: ['Curso não encontrado.'] });

      const { title, description, duration } = course;
      const totalStudents = await Course.count({
        where: { students_id: id },
      });

      return res.json({
        title, description, duration, totalStudents,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async store(req, res) {
    try {
      const newCourse = await Course.create(req.body);

      const {
        id,
        title,
        description,
        duration,
      } = newCourse;

      return res.status(201).json({
        id, title, description, duration,
      });
    } catch (error) {
      console.error(
        error,
      );
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = await req.params;

      if (!id) return res.status(400).json({ errors: ['É necessário um ID.'] });

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(400).json({ errors: ['Curso não encontrado.'] });
      }

      const hasUpdates = Object.keys(req.body).some(
        (field) => req.body[field] !== course[field],
      );

      if (!hasUpdates) {
        return res.status(400).json({
          errors: ['Nenhum dado foi modificado.'],
        });
      }
      const updatedCourse = await course.update(req.body);

      const {
        title,
        description,
        duration,
      } = updatedCourse;

      const totalStudents = await Course.count({
        where: { students_id: id },
      });

      return res.json(
        {
          title,
          description,
          duration,
          totalStudents,
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

      const course = await Course.findByPk(id);

      if (!course) return res.status(400).json({ errors: ['Curso não encontrado.'] });

      await course.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

const courseControllerInstance = new CourseController();
export default courseControllerInstance;
