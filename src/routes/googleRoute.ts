import { Router } from 'express';
import googleController from '../modules/google/controller/googleController';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { routeBodyValidation, routeHeaderValidation, routeQueryValidation } from '../middlewares/requestMiddleware';
import { codeSchema, createEventSchema, createSpreadSheetDataSchema, rangeSpreadSheetDataSchema, listEventsSchema, listSpreadSheetsSchema, refreshAccessTokenSchema, updateSpreadSheetDataSchema } from '../modules/google/validation/googleValidation';

const router: Router = Router();

router.get('/auth-code', googleController.googleAuth);
router.get('/auth-redirect-url', routeQueryValidation(codeSchema), googleController.googleAuthCallback);
router.get('/auth-refresh-access-token', routeQueryValidation(refreshAccessTokenSchema), googleController.googleRefreshAccessToken);

router.get('/calendars', routeHeaderValidation(authorizationSchema), googleController.googleListCalendars);
router.get('/event/:eventId/:calendarId', routeHeaderValidation(authorizationSchema), googleController.googleListEvent);
router.patch('/event/:eventId/:calendarId', routeHeaderValidation(authorizationSchema), googleController.googleUpdateEvent);
router.delete('/event/:eventId/:calendarId', routeHeaderValidation(authorizationSchema), googleController.googleDeleteEvent);
router.get('/events', routeHeaderValidation(authorizationSchema), routeQueryValidation(listEventsSchema), googleController.googleListEvents);
router.post('/event', routeHeaderValidation(authorizationSchema), routeBodyValidation(createEventSchema), googleController.googleCreateEvent);

router.get('/spread-sheet/:fileId', routeHeaderValidation(authorizationSchema), googleController.googleGetSpreadSheet);
router.get('/spread-sheets', routeHeaderValidation(authorizationSchema), routeQueryValidation(listSpreadSheetsSchema), googleController.googleListSpreadSheets);
router.get('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), routeQueryValidation(rangeSpreadSheetDataSchema), googleController.googleGetSpreadSheetData);
router.post('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), routeBodyValidation(createSpreadSheetDataSchema), googleController.googleAppendSpreadSheetData);
router.patch('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), routeBodyValidation(updateSpreadSheetDataSchema), googleController.googleUpdateSpreadSheetData);
router.delete('/spread-sheet-data/:fileId', routeHeaderValidation(authorizationSchema), routeQueryValidation(rangeSpreadSheetDataSchema), googleController.googleClearSpreadSheetData);

export default router;