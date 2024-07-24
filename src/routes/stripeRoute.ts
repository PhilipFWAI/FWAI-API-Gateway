import { Router } from 'express';
import stripeController from '../modules/stripe/controller/stripeController';
import { gatewayAuthentication } from '../middlewares/authenticationMiddleware';
import { authorizationSchema } from '../modules/auth/validation/authValidation';
import { isBodyValidation, isHeaderValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { planDetailsSchema, checkoutSessionSchema, emailSchema } from '../modules/stripe/validation/stripeValidation';

const router: Router = Router();

router.get('/products', isHeaderValidation(authorizationSchema), gatewayAuthentication, stripeController.stripeGetProducts);
router.post('/product', isHeaderValidation(authorizationSchema), gatewayAuthentication, isBodyValidation(planDetailsSchema), stripeController.stripecreateProduct);
router.get('/subscriptions', isHeaderValidation(authorizationSchema), gatewayAuthentication, isQueryValidation(emailSchema), stripeController.stripeGetSubscription);
router.post('/checkout-session', isHeaderValidation(authorizationSchema), gatewayAuthentication, isBodyValidation(checkoutSessionSchema), stripeController.stripeCheckoutSession);

export default router;
