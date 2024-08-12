import { Router } from 'express';
import { codeSchema } from '../modules/google/validation/googleValidation';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import hubspotController from '../modules/hubspot/controller/hubspotController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { isAuthPlatformTokenExist } from '../middlewares/authorizationMiddleware';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { hubspotCreateContactSchema, hubspotUpdateContactSchema, hubspotListSchema, hubspotCreatePipelineSchema, hubspotUpdateDealsPipelineSchema, hubspotCreateDealsSchema, hubspotUpdateDealsSchema, hubspotSearchContactsSchema, hubspotCreateCompanySchema, hubspotUpdateCompanySchema, hubspotCreateCustomObjectsSchema, hubspotUpdateCustomObjectsSchema } from '../modules/hubspot/validation/hubspotValidation';

const router: Router = Router();

router.get('/authorize', hubspotController.hubspotAuth);
router.post('/webhook',  hubspotController.hubspotWebhook);
router.get('/auth-redirect-url',  isQueryValidation(codeSchema), hubspotController.hubspotAuthCallback);
router.get('/auth-refresh-access-token', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotAuthRefreshAccessToken);

router.get('/:object/:attribute?', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), isBodyValidation(hubspotSearchContactsSchema), hubspotController.hubspotGetHandler);
router.delete('/:object/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteHandler);

router.post('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateContactSchema), hubspotController.hubspotCreateContacts);
router.patch('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateContactSchema), hubspotController.hubspotUpdateContacts);

router.post('/pipelines', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreatePipelineSchema), hubspotController.hubspotCreatePipelines);
router.patch('/pipelines/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateDealsPipelineSchema), hubspotController.hubspotUpdatePipelines);

router.post('/deals', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateDealsSchema), hubspotController.hubspotCreateDeals);
router.patch('/deals/:dealId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateDealsSchema), hubspotController.hubspotUpdateDeals);

router.post('/companies', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateCompanySchema), hubspotController.hubspotCreateCompanies);
router.patch('/companies/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateCompanySchema), hubspotController.hubspotUpdateCompanies);

router.post('/custom-objects', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateCustomObjectsSchema), hubspotController.hubspotCreateCustomObjects);
router.patch('/custom-objects/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateCustomObjectsSchema), hubspotController.hubspotUpdateCustomObjects);

export default router;