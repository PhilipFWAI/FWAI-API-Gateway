import { Router } from 'express';
import stripeController from '../modules/stripe/controller/stripeController';
import { isBodyValidation, isQueryValidation } from '../middlewares/requestMiddleware';
import { productDetailsSchema, checkoutSessionSchema, emailSchema } from '../modules/stripe/validation/stripeValidation';

const router: Router = Router();

router.get('/products', stripeController.stripeGetProducts);
router.get('/subscriptions', isQueryValidation(emailSchema), stripeController.stripeGetSubscription);
router.post('/product', isBodyValidation(productDetailsSchema), stripeController.stripecreateProduct);
router.post('/checkout-session', isBodyValidation(checkoutSessionSchema), stripeController.stripeCheckoutSession);

export default router;
