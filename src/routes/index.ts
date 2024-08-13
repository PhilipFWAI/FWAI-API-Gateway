
import { Router } from 'express';
import authRoute from './authRoute';
import stripeRoute from './stripeRoute';
import googleRoute from './googleRoute';
import hubspotRoute from './hubspotRoute';
import accountTypeRoute from './accountTypeRoute';
import { routeHeaderValidation } from '../middlewares/requestMiddleware';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';

const router: Router = Router();

router.use('/auth', authRoute);
router.use('/google', googleRoute);
router.use('/hubspot', hubspotRoute);
router.use('/stripe', routeHeaderValidation(authorizationSchema), gatewayAuthentication, stripeRoute);
router.use('/account-type', routeHeaderValidation(authorizationSchema), gatewayAuthentication, accountTypeRoute);

export default router;
