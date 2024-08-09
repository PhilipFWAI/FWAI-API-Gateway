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

router.get('/contacts-by-ids/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetContactsById);
router.get('/owners-by-emails/:email', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetOwnersByEmail);
router.get('/contacts-by-emails/:email', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetContactsByEmail);
router.post('/search-contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotSearchContactsSchema), hubspotController.hubspotSearchContacts);

router.delete('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteContacts);
router.get('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListContacts);
router.post('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateContactSchema), hubspotController.hubspotCreateContacts);
router.patch('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateContactSchema), hubspotController.hubspotUpdateContacts);

router.get('/pipelines/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetPipeline);
router.delete('/pipelines/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeletePipelines);
router.get('/pipelines', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListPipelines);
router.post('/pipelines', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreatePipelineSchema), hubspotController.hubspotCreatePipelines);
router.patch('/pipelines/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateDealsPipelineSchema), hubspotController.hubspotUpdatePipelines);

router.get('/deals', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListDeals);
router.post('/deals', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateDealsSchema), hubspotController.hubspotCreateDeals);
router.patch('/deals/:dealId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateDealsSchema), hubspotController.hubspotUpdateDeals);

router.get('/analytics-views', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListAnalyticsViews);
router.get('/analytics-events', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListAnalyticsEvents);
router.get('/analytics-reports', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListAnalyticsReports);

router.get('/companies', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListCompanies);
router.post('/companies', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateCompanySchema), hubspotController.hubspotCreateCompanies);
router.patch('/companies/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateCompanySchema), hubspotController.hubspotUpdateCompanies);
router.delete('/companies/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteCompanies);

router.get('/custom-objects', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListCompanies);
router.post('/custom-objects', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateCustomObjectsSchema), hubspotController.hubspotCreateCustomObjects);
router.patch('/custom-objects/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateCustomObjectsSchema), hubspotController.hubspotUpdateCustomObjects);
router.delete('/custom-objects/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteCustomObjects);

export default router;