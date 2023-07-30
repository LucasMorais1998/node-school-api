import { Router } from 'express';
import courseController from '../controllers/CourseController';
// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', courseController.index);

export default router;
