import { Router } from 'express';
import { accountAuthorization } from '../middlewares/authorization';
import authControllers from '../modules/auth/controller/authControllers';
import { signupSchema, userDeviceSchema, signinSchema, authorizationSchema } from '../modules/auth/validation/authValidations';
import { isBodyValidation, isHeaderValidation, isUserExist, isAccountVerified, isCredentialExist } from '../middlewares/validations';

const router: Router = Router();
router.get('/verify-email/:access_token', isAccountVerified, authControllers.verifyEmail);
router.post('/signup', isHeaderValidation(userDeviceSchema), isBodyValidation(signupSchema), isUserExist, authControllers.signup);
router.post('/signin', isHeaderValidation(userDeviceSchema), isBodyValidation(signinSchema), isCredentialExist, authControllers.signin);
router.delete('/signout', isHeaderValidation(authorizationSchema), accountAuthorization([ '1', '2', '3' ]), authControllers.signout);

export default router;
