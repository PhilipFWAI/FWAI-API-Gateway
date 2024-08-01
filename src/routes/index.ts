import { Router } from 'express';
import authRoute from './authRoute';
import stripeRoute from './stripeRoute';
import googleRoute from './googleRoute';
import zapierRoute from './zapierRoute';

import accountTypeRoute from './accountTypeRoute';
import { isHeaderValidation } from '../middlewares/requestMiddleware';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';

const router: Router = Router();

router.use('/auth', authRoute);
router.use('/google', googleRoute);
router.use('/zapier', zapierRoute);
router.use('/stripe', isHeaderValidation(authorizationSchema), gatewayAuthentication, stripeRoute);
router.use('/account-type', isHeaderValidation(authorizationSchema), gatewayAuthentication, accountTypeRoute);

export default router;
