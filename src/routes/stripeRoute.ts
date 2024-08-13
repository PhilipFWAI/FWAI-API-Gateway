import { Router } from 'express';
import stripeController from '../modules/stripe/controller/stripeController';
import { routeBodyValidation, routeQueryValidation } from '../middlewares/requestMiddleware';
import { productDetailsSchema, checkoutSessionSchema, emailSchema } from '../modules/stripe/validation/stripeValidation';

const router: Router = Router();

router.get('/products', stripeController.stripeGetProducts);
router.get('/subscriptions', routeQueryValidation(emailSchema), stripeController.stripeGetSubscription);
router.post('/product', routeBodyValidation(productDetailsSchema), stripeController.stripeCreateProduct);
router.post('/checkout-session', routeBodyValidation(checkoutSessionSchema), stripeController.stripeCheckoutSession);

export default router;
