import { Router } from 'express';
import { isAccountTypeExist } from '../middlewares/authorizationMiddleware';
import accountController from '../modules/account/controller/accountController';
import { routeBodyValidation } from '../middlewares/requestMiddleware';
import { createAccountTypeSchema } from '../modules/account/validation/accountValidation';

const router: Router = Router();

router.get('/account-types', accountController.getAccountTypes);
router.post('/account-type', routeBodyValidation(createAccountTypeSchema), isAccountTypeExist, accountController.createAccountType);

export default router;
