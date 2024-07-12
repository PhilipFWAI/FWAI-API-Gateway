import { Router } from 'express';
import { gatewayAuthorization } from '../middlewares/authorization';
import authControllers from '../modules/auth/controller/authControllers';
import { isBodyValidation, isHeaderValidation, isUserExist, isAccountVerified, isCredentialExist } from '../middlewares/validations';
import { signupSchema, userDeviceSchema, signinSchema, gatewayAuthorizationSchema } from '../modules/auth/validation/authValidations';

const router: Router = Router();
router.get('/verify-email/:access_token', isAccountVerified, authControllers.verifyEmail);
router.post('/signup', isHeaderValidation(userDeviceSchema), isBodyValidation(signupSchema), isUserExist, authControllers.signup);
router.post('/signin', isHeaderValidation(userDeviceSchema), isBodyValidation(signinSchema), isCredentialExist, authControllers.signin);
router.delete('/signout', isHeaderValidation(gatewayAuthorizationSchema), isHeaderValidation(userDeviceSchema), gatewayAuthorization([ '1', '2', '3' ]), authControllers.signout);

export default router;
