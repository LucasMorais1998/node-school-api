import { Router } from 'express';
import courseStudentsController from '../controllers/CourseStudentsController';

const router = new Router();

router.post('/', courseStudentsController.store);
router.delete('/:student_id/:course_id', courseStudentsController.destroy);

export default router;
