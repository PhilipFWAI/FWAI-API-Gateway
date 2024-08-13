import { Router } from 'express';
import { codeSchema } from '../modules/google/validation/googleValidation';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import hubspotController from '../modules/hubspot/controller/hubspotController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { isAuthPlatformTokenExist } from '../middlewares/authorizationMiddleware';
import { hubspotListSchema, hubspotSearchContactsSchema } from '../modules/hubspot/validation/hubspotValidation';
import { routeBodyValidation, routeHeaderValidation, routeQueryValidation } from '../middlewares/requestMiddleware';

const router: Router = Router();

router.get('/authorize', hubspotController.hubspotAuth);
router.get('/auth-redirect-url',  routeQueryValidation(codeSchema), hubspotController.hubspotAuthCallback);
router.get('/auth-refresh-access-token', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotAuthRefreshAccessToken);

router.post('/webhook',  hubspotController.hubspotWebhook);
router.post('/:object', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotPostHandler);
router.patch('/:object/:id', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotUpdateHandler);
router.delete('/:object/:id', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteHandler);
router.get('/:object/:attribute?', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), routeQueryValidation(hubspotListSchema), routeBodyValidation(hubspotSearchContactsSchema), hubspotController.hubspotGetHandler);

export default router;