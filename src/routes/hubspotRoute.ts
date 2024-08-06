import { Router } from 'express';
import { codeSchema } from '../modules/google/validation/googleValidation';
import hubspotController from '../modules/hubspot/controller/hubspotController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { authorizationSchema, authTokensSchema } from '../modules/auth/validation/authValidation';
import { isAuthPlatformExist, isAuthPlatformTokenExist } from '../middlewares/authorizationMiddleware';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { hubspotCreateContactSchema, hubspotUpdateContactSchema, hubspotListSchema, hubspotCreateDealsPipelineStagesSchema, hubspotUpdateDealsPipelineSchema, hubspotCreateDealsSchema, hubspotUpdateDealsSchema, hubspotSearchContactsSchema } from '../modules/hubspot/validation/hubspotValidation';

const router: Router = Router();

router.get('/authorize', hubspotController.hubspotAuth);
router.get('/auth-redirect-url',  isQueryValidation(codeSchema), hubspotController.hubspotAuthCallback);
router.get('/auth-refresh-access-token', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotAuthRefreshAccessToken);
router.post('/save-auth-tokens', isHeaderValidation(authorizationSchema), isBodyValidation(authTokensSchema), gatewayAuthentication, isAuthPlatformExist('hubspot'), hubspotController.HubspotSaveAuthTokens);

router.delete('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteContact);
router.get('/contacts-by-ids/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetContactsById);
router.get('/owners-by-emails/:email', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetOwnersByEmail);
router.get('/contacts-by-emails/:email', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetContactsByEmail);
router.post('/search-contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotSearchContactsSchema), hubspotController.hubspotSearchContacts);

router.get('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListContacts);
router.post('/contacts', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateContactSchema), hubspotController.hubspotCreateContact);
router.patch('/contacts/:id', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateContactSchema), hubspotController.hubspotUpdateContact);

router.get('/deals-pipelines-stages/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotGetDealsPipelineStages);
router.delete('/deals-pipelines-stages/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), hubspotController.hubspotDeleteDealsPipelineStages);
router.get('/deals-pipelines-stages', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListDealsPipelines);
router.post('/deals-pipelines-stages', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateDealsPipelineStagesSchema), hubspotController.hubspotCreateDealsPipelineStages);
router.patch('/deals-pipelines-stages/:pipelineId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateDealsPipelineSchema), hubspotController.hubspotUpdateDealsPipelineStages);

router.get('/deals', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListDeals);
router.post('/deals', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotCreateDealsSchema), hubspotController.hubspotCreateDeals);
router.patch('/deals/:dealId', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isBodyValidation(hubspotUpdateDealsSchema), hubspotController.hubspotUpdateDeals);

router.get('/analytics-views', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListAnalyticsViews);
router.get('/analytics-events', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListAnalyticsEvents);
router.get('/analytics-reports', isHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('hubspot'), isQueryValidation(hubspotListSchema), hubspotController.hubspotListAnalyticsReports);

export default router;