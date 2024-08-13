import { Router } from 'express';
import googleController from '../modules/google/controller/googleController';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { isAuthPlatformTokenExist } from '../middlewares/authorizationMiddleware';
import { routeBodyValidation, routeHeaderValidation, routeQueryValidation } from '../middlewares/requestMiddleware';
import { codeSchema, createEventSchema, createSpreadSheetDataSchema, rangeSpreadSheetDataSchema, listEventsSchema, listSpreadSheetsSchema, updateSpreadSheetDataSchema } from '../modules/google/validation/googleValidation';

const router: Router = Router();

router.get('/authorize', googleController.googleAuth);
router.get('/auth-redirect-url', routeQueryValidation(codeSchema), googleController.googleAuthCallback);
router.get('/auth-refresh-access-token', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), googleController.googleRefreshAccessToken);

router.get('/calendars', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), googleController.googleListCalendars);
router.get('/event/:eventId/:calendarId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), googleController.googleListEvent);
router.patch('/event/:eventId/:calendarId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), googleController.googleUpdateEvent);
router.delete('/event/:eventId/:calendarId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), googleController.googleDeleteEvent);
router.get('/events', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeQueryValidation(listEventsSchema), googleController.googleListEvents);
router.post('/event', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeBodyValidation(createEventSchema), googleController.googleCreateEvent);

router.get('/spread-sheet/:fileId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), googleController.googleGetSpreadSheet);
router.get('/spread-sheets', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeQueryValidation(listSpreadSheetsSchema), googleController.googleListSpreadSheets);
router.get('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeQueryValidation(rangeSpreadSheetDataSchema), googleController.googleGetSpreadSheetData);
router.post('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeBodyValidation(createSpreadSheetDataSchema), googleController.googleAppendSpreadSheetData);
router.patch('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeBodyValidation(updateSpreadSheetDataSchema), googleController.googleUpdateSpreadSheetData);
router.delete('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), gatewayAuthentication, isAuthPlatformTokenExist('google'), routeQueryValidation(rangeSpreadSheetDataSchema), googleController.googleClearSpreadSheetData);

export default router;