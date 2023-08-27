import { Router } from 'express';
import courseStudentsController from '../controllers/CourseStudentsController';
import authMiddleware from '../middlewares/authMiddleware';

const router = new Router();

router.post('/', authMiddleware, courseStudentsController.store);
router.delete('/:student_id/:course_id', authMiddleware, courseStudentsController.destroy);

export default router;
