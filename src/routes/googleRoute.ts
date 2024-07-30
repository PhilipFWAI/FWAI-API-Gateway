import { Router } from 'express';
import googleController from '../modules/google/controller/googleController';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { codeSchema, createEventschema, listEventschema, refreshAccessTokenSchema } from '../modules/google/validation/googleValidation';

const router: Router = Router();

router.get('/auth-code', googleController.googleAuth);
router.get('/auth-redirect-url', isQueryValidation(codeSchema), googleController.googleAuthCallback);
router.get('/refresh-access-token', isQueryValidation(refreshAccessTokenSchema), googleController.googleRefreshAccessToken);

router.get('/calendars', isHeaderValidation(authorizationSchema), googleController.googleListCalendars);
router.get('/event/:eventId/:calendarId', isHeaderValidation(authorizationSchema), googleController.googleListEvent);
router.delete('/event/:eventId/:calendarId', isHeaderValidation(authorizationSchema), googleController.googleDeleteEvent);
router.get('/events', isHeaderValidation(authorizationSchema), isQueryValidation(listEventschema), googleController.googleListEvents);
router.post('/event', isHeaderValidation(authorizationSchema), isBodyValidation(createEventschema), googleController.googleCreateEvent);
router.put('/event/:eventId/:calendarId', isHeaderValidation(authorizationSchema), googleController.googleUpdateEvent);

export default router;
