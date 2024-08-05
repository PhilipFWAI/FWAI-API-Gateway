import { Router } from 'express';
import { isQueryValidation } from '../middlewares/requestMiddleware';
import hubspotController from '../modules/hubspot/controller/hubspotController';
import { codeSchema, refreshAccessTokenSchema } from '../modules/google/validation/googleValidation';

const router: Router = Router();

router.get('/authorize', hubspotController.hubspotAuth);
router.get('/auth-redirect-url', isQueryValidation(codeSchema), hubspotController.hubspotAuthCallback);
router.get('/auth-refresh-access-token', isQueryValidation(refreshAccessTokenSchema), hubspotController.hubspotAuthRefreshAccessToken);

export default router;
