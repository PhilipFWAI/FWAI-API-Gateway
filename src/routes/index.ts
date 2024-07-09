import { Router } from 'express';
import authRouters from './authRouters';

const router: Router = Router();
router.use('/auth', authRouters);

export default router;
