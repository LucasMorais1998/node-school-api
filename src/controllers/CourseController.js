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
}

const courseControllerInstance = new CourseController();
export default courseControllerInstance;
