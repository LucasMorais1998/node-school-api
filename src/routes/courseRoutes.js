import { Router } from 'express';
import courseController from '../controllers/CourseController';
// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', courseController.index);
router.get('/:id', courseController.show);
router.post('/', courseController.store);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);

export default router;
