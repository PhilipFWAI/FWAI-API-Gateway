import { Router } from 'express';
import authController from '../modules/auth/controller/authController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { isUserExist, isAccountVerified, isCredentialExist, isAuthPlatformExist } from '../middlewares/authorizationMiddleware';
import { routeBodyValidation, routeHeaderValidation } from '../middlewares/requestMiddleware';
import { signupSchema, userDeviceSchema, signinSchema, authorizationSchema, authTokensSchema } from '../modules/auth/validation/authValidation';

const router: Router = Router();

router.get('/verify-email/:access_token', isAccountVerified, authController.verifyEmail);
router.post('/signup', routeHeaderValidation(userDeviceSchema), routeBodyValidation(signupSchema), isUserExist, authController.signup);
router.post('/signin', routeHeaderValidation(userDeviceSchema), routeBodyValidation(signinSchema), isCredentialExist, authController.signin);
router.delete('/signout', routeHeaderValidation(authorizationSchema), routeHeaderValidation(userDeviceSchema), gatewayAuthentication, authController.signout);
router.post('/save-auth-tokens', routeHeaderValidation(authorizationSchema), routeBodyValidation(authTokensSchema), gatewayAuthentication, isAuthPlatformExist, authController.HubspotSaveAuthTokens);

export default router;
