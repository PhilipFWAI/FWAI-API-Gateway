import { Router } from 'express';
import { isHeaderValidation } from '../middlewares/validations';
import { gatewayAuthorization } from '../middlewares/authorization';
import stripeControllers from '../modules/stripe/controller/stripeControllers';
import { gatewayAuthorizationSchema } from '../modules/auth/validation/authValidations';

const router: Router = Router();
router.get('/checkout-payment-cancelled', stripeControllers.stripeCheckoutCancelled);
router.get('/checkout-payment-succeeded', stripeControllers.stripeCheckoutSucceeded);

router.post('/plan-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripePlan);
router.post('/customer-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeCustomer);
router.post('/price-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripePrice);
router.post('/payment-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripePayment);
router.post('/subscription-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeSubscription);
router.post('/checkout-subscription', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeCheckoutSubscription);
router.post('/checkout-subscription-payment-complete-flow', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeCheckoutSubscriptionCompleteFlow);

export default router;
