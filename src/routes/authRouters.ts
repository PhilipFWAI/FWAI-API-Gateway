import { Router } from 'express';
import { gatewayAuthorization } from '../middlewares/authorization';
import authControllers from '../modules/auth/controller/authControllers';
import { signupSchema, userDeviceSchema, signinSchema, authorizationSchema, accessTokenSchema } from '../modules/auth/validation/authValidations';
import { isBodyValidation, isHeaderValidation, isUserExist, isAccountVerified, isCredentialExist, isParamValidation } from '../middlewares/validations';

const router: Router = Router();
router.get('/verify-email/:access_token', isParamValidation(accessTokenSchema), isAccountVerified, authControllers.verifyEmail);
router.post('/signup', isHeaderValidation(userDeviceSchema), isBodyValidation(signupSchema), isUserExist, authControllers.signup);
router.post('/signin', isHeaderValidation(userDeviceSchema), isBodyValidation(signinSchema), isCredentialExist, authControllers.signin);
router.delete('/signout', isHeaderValidation(authorizationSchema), isHeaderValidation(userDeviceSchema), gatewayAuthorization, authControllers.signout);

export default router;
