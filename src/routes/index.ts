import { Router } from 'express';
import authRouters from './authRouters';
import stripeRouters from './stripeRouters';

const router: Router = Router();
router.use('/auth', authRouters);
router.use('/stripe', stripeRouters);

export default router;
