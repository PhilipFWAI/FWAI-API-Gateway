import { Router } from 'express';
import authRoute from './authRoute';
import stripeRoute from './stripeRoute';
import accountTypeRoute from './accountTypeRoute';

const router: Router = Router();
router.use('/auth', authRoute);
router.use('/stripe', stripeRoute);
router.use('/account-type', accountTypeRoute);

export default router;
