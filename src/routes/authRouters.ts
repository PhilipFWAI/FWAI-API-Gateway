import { Router } from 'express';
import authControllers from '../modules/auth/controller/authControllers';
import { signupSchema } from '../modules/auth/validation/authValidations';
import { isBodyValidation, isUserExist } from '../middlewares/validations';


const router: Router = Router();
router.post('/signup', isBodyValidation(signupSchema), isUserExist, authControllers.signup);

export default router;
