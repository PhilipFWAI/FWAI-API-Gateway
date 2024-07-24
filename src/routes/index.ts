import { Router } from 'express';
import authRouters from './authRouters';
import stripeRouters from './stripeRouters';
import accountTypeRouters from './accountTypeRouters';

const router: Router = Router();
router.use('/auth', authRouters);
router.use('/stripe', stripeRouters);
router.use('/account-type', accountTypeRouters);

export default router;
