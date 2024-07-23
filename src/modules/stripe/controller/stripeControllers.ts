import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';
import stripeRepositories from '../repository/stripeRepositories';
import { customerInfoUtil } from '../../../utils/customerInfoUtils';
import { PriceInfoInterface, ProductInfoInterface } from '../../../types/strapiTypes';

const stripePlan = async (req, res) => {
  try {
    let product: ProductInfoInterface = await stripeRepositories.getStripeProductByAttribute('name', req.body.planInfo.name);
    if (!product) product = await stripeRepositories.createStripeProduct(req.body.planInfo);

    responseUtils.handleSuccess(httpStatus.OK, 'Stripe plan proceed successfully.', { product });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

const stripeCheckoutSession = async (req, res) => {
  try {
    let customer = await stripeRepositories.getStripeCustomerByAttribute('email', req.body.sessionInfo.customer_email);
    if (!customer) customer = await stripeRepositories.createStripeCustomer({ email: req.body.sessionInfo.customer_email });

    delete req.body.sessionInfo.customer_email;
    req.body.sessionInfo.customer = customer.id;
    let session = await stripeRepositories.getStripeSessionByAttribute('customer', customer.id);
    if (!session) session = await stripeRepositories.createStripeSession(req.body.sessionInfo);
    
    responseUtils.handleSuccess(httpStatus.OK, 'Stripe payment checked-out proceed successfully.', { session });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

const stripeGetSubscription = async (req, res) => {
  try {
    let customer = await stripeRepositories.getStripeCustomerByAttribute('email', req.query.email);
    if (!customer) customer = await stripeRepositories.createStripeCustomer({ email: req.query.email });

    const subscription = await stripeRepositories.getStripeSubscriptionByAttribute('customer', customer.id);
    responseUtils.handleSuccess(httpStatus.OK, 'Stripe subscription proceed successfully.', { subscription });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

const stripeGetProducts = async (req, res) => {
  try {
    const products = await stripeRepositories.getStripeProducts();

    responseUtils.handleSuccess(httpStatus.OK, 'Stripe products proceed successfully.', { products });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

export default { stripeGetSubscription, stripePlan, stripeCheckoutSession, stripeGetProducts };
