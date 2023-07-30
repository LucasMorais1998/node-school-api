import { Router } from 'express';

import studentController from '../controllers/StudentController';

const router = new Router();

router.get('/:id', studentController.show);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.destroy);

export default router;
