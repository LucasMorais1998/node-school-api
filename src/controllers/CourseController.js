import errorHandler from '../middlewares/errorHandlerMiddleware';
import Course from '../models/Course';
import CourseStudents from '../models/CourseStudents';
import Student from '../models/Student';

class CourseController {
  async index(req, res) {
    try {
      const page = req.query.page || 1;
      const perPage = 10;

      const { count, rows: courses } = await Course.findAndCountAll({
        attributes: ['id', 'title', 'description', 'duration'],
        order: [['id', 'DESC']],
        include: [{
          model: Student,
          as: 'students',
        }],
        limit: perPage,
        offset: (page - 1) * perPage,
      });

      const totalPages = Math.ceil(count / perPage);

      const paginatedCourses = courses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        duration: course.duration,
        totalStudents: course.students.length,
      }));

      if (paginatedCourses.length === 0) {
        return res.status(204).send();
      }

      return res.json({
        courses: paginatedCourses,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['id is required.'] });

      const course = await Course.findByPk(id, {
        attributes: ['id', 'title', 'description', 'duration'],
        include: [{
          model: Student,
          as: 'students',
          attributes: [],
        }],
      });

      if (!course) {
        return res.status(404).json({ errors: ['Course not found.'] });
      }

      const totalStudents = await CourseStudents.count({
        where: {
          course_id: course.id,
        },
      });

      const courseWithTotalStudents = {
        ...course.toJSON(),
        totalStudents,
      };

      return res.json(courseWithTotalStudents);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async store(req, res) {
    try {
      const newCourse = await Course.create(req.body);

      const { id, title, description, duration } = newCourse;

      return res.status(201).json({
        id,
        title,
        description,
        duration,
      });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async update(req, res) {
    try {
      const { id } = await req.params;

      if (!id) return res.status(400).json({ errors: ['id is required.'] });

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({ errors: ['Course not found.'] });
      }

      const hasUpdates = Object.keys(req.body).some(
        (field) => req.body[field] !== course[field],
      );

      if (!hasUpdates) {
        return res.status(204).end();
      }
      const updatedCourse = await course.update(req.body);

      const { title, description, duration } = updatedCourse;

      const totalStudents = await CourseStudents.count({
        where: {
          course_id: course.id,
        },
      });

      return res.json({
        id,
        title,
        description,
        duration,
        totalStudents,
      });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async destroy(req, res) {
    try {
      const { id } = await req.params;

      if (!id) return res.status(400).json({ errors: ['id is required.'] });

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({ errors: ['Course not found.'] });
      }

      await course.destroy();
      return res.status(204).send();
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }
}

const courseControllerInstance = new CourseController();
export default courseControllerInstance;
