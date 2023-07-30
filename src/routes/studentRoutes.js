import { Router } from 'express';

import studentController from '../controllers/StudentController';

const router = new Router();

router.get('/:id', studentController.show);

export default router;
