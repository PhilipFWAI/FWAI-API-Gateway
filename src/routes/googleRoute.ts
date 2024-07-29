import { Router } from 'express';
import googleController from '../modules/google/controller/googleController';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { codeSchema, createEventSchema, createSpreadSheetDataSchema, rangeSpreadSheetDataSchema, listEventsSchema, listSpreadSheetsSchema, refreshAccessTokenSchema, updateSpreadSheetDataSchema } from '../modules/google/validation/googleValidation';

const router: Router = Router();

router.get('/auth-code', googleController.googleAuth);
router.get('/auth-redirect-url', isQueryValidation(codeSchema), googleController.googleAuthCallback);
router.get('/refresh-access-token', isQueryValidation(refreshAccessTokenSchema), googleController.googleRefreshAccessToken);

router.get('/calendars', isHeaderValidation(authorizationSchema), googleController.googleListCalendars);
router.get('/event/:eventId/:calendarId', isHeaderValidation(authorizationSchema), googleController.googleListEvent);
router.patch('/event/:eventId/:calendarId', isHeaderValidation(authorizationSchema), googleController.googleUpdateEvent);
router.delete('/event/:eventId/:calendarId', isHeaderValidation(authorizationSchema), googleController.googleDeleteEvent);
router.get('/events', isHeaderValidation(authorizationSchema), isQueryValidation(listEventsSchema), googleController.googleListEvents);
router.post('/event', isHeaderValidation(authorizationSchema), isBodyValidation(createEventSchema), googleController.googleCreateEvent);

router.get('/spread-sheet/:fileId', isHeaderValidation(authorizationSchema), googleController.googleGetSpreadSheet);
router.get('/spread-sheets', isHeaderValidation(authorizationSchema), isQueryValidation(listSpreadSheetsSchema), googleController.googleListSpreadSheets);
router.get('/spread-sheet-data/:fileId', isHeaderValidation(authorizationSchema), isQueryValidation(rangeSpreadSheetDataSchema), googleController.googleGetSpreadSheetData);
router.post('/spread-sheet-data/:fileId', isHeaderValidation(authorizationSchema), isBodyValidation(createSpreadSheetDataSchema), googleController.googleAppendSpreadSheetData);
router.patch('/spread-sheet-data/:fileId', isHeaderValidation(authorizationSchema), isBodyValidation(updateSpreadSheetDataSchema), googleController.googleUpdateSpreadSheetData);
router.delete('/spread-sheet-data/:fileId', isHeaderValidation(authorizationSchema), isQueryValidation(rangeSpreadSheetDataSchema), googleController.googleClearSpreadSheetData);

export default router;