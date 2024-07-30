import { Router } from 'express';
import authController from '../modules/auth/controller/authController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { isUserExist, isAccountVerified, isCredentialExist } from '../middlewares/authorizationMiddleware';
import { isBodyValidation, isHeaderValidation } from '../middlewares/requestMiddleware';
import { signupSchema, userDeviceSchema, signinSchema, authorizationSchema } from '../modules/auth/validation/authValidation';

const router: Router = Router();

router.get('/verify-email/:access_token', isAccountVerified, authController.verifyEmail);
router.post('/signup', isHeaderValidation(userDeviceSchema), isBodyValidation(signupSchema), isUserExist, authController.signup);
router.post('/signin', isHeaderValidation(userDeviceSchema), isBodyValidation(signinSchema), isCredentialExist, authController.signin);
router.delete('/signout', isHeaderValidation(authorizationSchema), isHeaderValidation(userDeviceSchema), gatewayAuthentication, authController.signout);

export default router;
