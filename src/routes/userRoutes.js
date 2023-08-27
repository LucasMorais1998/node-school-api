import { Router } from 'express';
import userController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = new Router();

router.post('/', userController.store);
router.put('/', authMiddleware, userController.update);
router.delete('/', authMiddleware, userController.destroy);

export default router;
