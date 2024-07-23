import { Router } from 'express';
import { gatewayAuthorization } from '../middlewares/authorization';
import stripeControllers from '../modules/stripe/controller/stripeControllers';
import { authorizationSchema } from '../modules/auth/validation/authValidations';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/validations';
import { planDetailsSchema, checkoutSessionSchema, emailSchema } from '../modules/stripe/validation/stripeValidations';

const router: Router = Router();

router.get('/get-products', isHeaderValidation(authorizationSchema), gatewayAuthorization, stripeControllers.stripeGetProducts);

router.post('/plan-details', isHeaderValidation(authorizationSchema), gatewayAuthorization, isBodyValidation(planDetailsSchema), stripeControllers.stripePlan);

router.get('/subscription-details', isHeaderValidation(authorizationSchema), gatewayAuthorization, isQueryValidation(emailSchema), stripeControllers.stripeGetSubscription);

router.post('/checkout-session', isHeaderValidation(authorizationSchema), gatewayAuthorization, isBodyValidation(checkoutSessionSchema), stripeControllers.stripeCheckoutSession);


export default router;
