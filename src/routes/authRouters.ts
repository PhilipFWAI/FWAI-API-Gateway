import { Router } from 'express';
import authControllers from '../modules/auth/controller/authControllers';
import { signupSchema, userDeviceSchema } from '../modules/auth/validation/authValidations';
import { isBodyValidation, isHeaderValidation, isUserExist, isAccountVerified } from '../middlewares/validations';

const router: Router = Router();
router.post('/signup', isHeaderValidation(userDeviceSchema), isBodyValidation(signupSchema), isUserExist, authControllers.signup);
router.get('/verify-email/:access_token', isAccountVerified, authControllers.verifyEmail);

export default router;
