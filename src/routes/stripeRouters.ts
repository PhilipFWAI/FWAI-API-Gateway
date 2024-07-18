import { Router } from 'express';
import { isBodyValidation, isHeaderValidation } from '../middlewares/validations';
import { gatewayAuthorization } from '../middlewares/authorization';
import stripeControllers from '../modules/stripe/controller/stripeControllers';
import { gatewayAuthorizationSchema } from '../modules/auth/validation/authValidations';
import { customerDetailsSchema, planDetailsSchema, priceDetailsSchema, checkoutSessionSchema, completeCheckoutSessionSchema } from '../modules/stripe/validation/stripeValidations';

const router: Router = Router();
router.get('/checkout-payment-cancelled', stripeControllers.stripeCheckoutCancelled);

router.get('/checkout-payment-succeeded', stripeControllers.stripeCheckoutSucceeded);

router.get('/subscription-details/:customerId', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeGetSubscription);

router.post('/plan-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), isBodyValidation(planDetailsSchema), stripeControllers.stripePlan);

router.post('/price-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), isBodyValidation(priceDetailsSchema), stripeControllers.stripePrice);

router.post('/customer-details', isHeaderValidation(gatewayAuthorizationSchema), gatewayAuthorization([ '1', '2', '3' ]), isBodyValidation(customerDetailsSchema), stripeControllers.stripeCustomer);

router.post('/checkout-session', isHeaderValidation(gatewayAuthorizationSchema), isBodyValidation(checkoutSessionSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeCheckoutSession);

router.post('/checkout-session-complete-flow', isHeaderValidation(gatewayAuthorizationSchema), isBodyValidation(completeCheckoutSessionSchema), gatewayAuthorization([ '1', '2', '3' ]), stripeControllers.stripeCheckoutSessionCompleteFlow);

export default router;
