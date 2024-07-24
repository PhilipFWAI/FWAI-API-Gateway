import { Router } from 'express';
import { gatewayAuthorization } from '../middlewares/authorization';
import { authorizationSchema } from '../modules/auth/validation/authValidations';
import accountControllers from '../modules/account/controller/accountControllers';
import { createAccountTypeSchema } from '../modules/account/validation/accountValidations';
import { isAccountTypeExist, isBodyValidation, isHeaderValidation } from '../middlewares/validations';

const router: Router = Router();

router.get('/get-accounts', isHeaderValidation(authorizationSchema), gatewayAuthorization, accountControllers.getAccountTypes);
router.post('/create-account', isHeaderValidation(authorizationSchema), gatewayAuthorization, isBodyValidation(createAccountTypeSchema), isAccountTypeExist, accountControllers.createAccountType);

export default router;
