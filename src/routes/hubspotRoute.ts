import { Router } from 'express';
import { codeSchema } from '../modules/google/validation/googleValidation';
import hubspotController from '../modules/hubspot/controller/hubspotController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { authorizationSchema, authTokensSchema } from '../modules/auth/validation/authValidation';
import { isAuthPlatformExist, isAuthPlatformTokenExist } from '../middlewares/authorizationMiddleware';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { hubspotCreateContactSchema, hubspotUpdateContactSchema, listHubspotSchema } from '../modules/hubspot/validation/hubspotValidation';

const router: Router = Router();

router.get('/authorize', hubspotController.hubspotAuth);
router.get('/auth-redirect-url',  isQueryValidation(codeSchema), hubspotController.hubspotAuthCallback);
router.get('/auth-refresh-access-token', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotAuthRefreshAccessToken);
router.post('/save-auth-tokens', isHeaderValidation(authorizationSchema), isBodyValidation(authTokensSchema), gatewayAuthentication, isAuthPlatformExist('hubspot'), hubspotController.saveHubspotAuthTokens);

router.delete('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteContact);
router.get('/contacts-by-ids/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetContactById);
router.get('/contacts-by-emails/:email', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetContactByEmail);
router.get('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(listHubspotSchema), hubspotController.hubspotListContacts);
router.post('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateContactSchema), hubspotController.hubspotCreateContact);
router.patch('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateContactSchema), hubspotController.hubspotUpdateContact);

export default router;