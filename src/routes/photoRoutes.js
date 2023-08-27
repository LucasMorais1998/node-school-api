import { Router } from 'express';
import photoController from '../controllers/PhotoController';
import authMiddleware from '../middlewares/authMiddleware';

const router = new Router();

router.post('/', authMiddleware, photoController.store);

export default router;
