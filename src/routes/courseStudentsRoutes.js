import { Router } from 'express';
import courseStudentsController from '../controllers/CourseStudentsController';

const router = new Router();

router.post('/', courseStudentsController.store);

export default router;
