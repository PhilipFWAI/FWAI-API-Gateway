import { Router } from 'express';
import { isAccountTypeExist } from '../middlewares/authorizationMiddleware';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import accountController from '../modules/account/controller/accountController';
import { isBodyValidation, isHeaderValidation } from '../middlewares/requestMiddleware';
import { createAccountTypeSchema } from '../modules/account/validation/accountValidation';

const router: Router = Router();

router.get('/account-types', isHeaderValidation(authorizationSchema), gatewayAuthentication, accountController.getAccountTypes);
router.post('/account-type', isHeaderValidation(authorizationSchema), gatewayAuthentication, isBodyValidation(createAccountTypeSchema), isAccountTypeExist, accountController.createAccountType);

export default router;
