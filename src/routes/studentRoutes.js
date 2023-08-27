import { Router } from 'express';
import studentController from '../controllers/StudentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = new Router();

router.get('/', studentController.index);
router.get('/:id', studentController.show);
router.post('/', authMiddleware, studentController.store);
router.put('/:id', authMiddleware, studentController.update);
router.delete('/:id', authMiddleware, studentController.destroy);

export default router;
