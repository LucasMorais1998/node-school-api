import { Router } from 'express';
import courseController from '../controllers/CourseController';
import authMiddleware from '../middlewares/authMiddleware';

const router = new Router();

router.get('/', courseController.index);
router.get('/:id', courseController.show);
router.post('/', authMiddleware, courseController.store);
router.put('/:id', authMiddleware, courseController.update);
router.delete('/:id', authMiddleware, courseController.destroy);

export default router;
