import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';
import stripeRepository from '../repository/stripeRepository';
import { ProductInfoInterface } from '../../../types/strapiTypes';

const stripecreateProduct = async (req, res) => {
  try {
    let product: ProductInfoInterface = await stripeRepository.getStripeProductByAttribute('name', req.body.planInfo.name);
    if (!product) product = await stripeRepository.createStripeProduct(req.body.planInfo);

    responseUtils.handleSuccess(httpStatus.OK, 'Success.', { product });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

const stripeCheckoutSession = async (req, res) => {
  try {
    let customer = await stripeRepository.getStripeCustomerByAttribute('email', req.body.sessionInfo.customer_email);
    if (!customer) customer = await stripeRepository.createStripeCustomer({ email: req.body.sessionInfo.customer_email });

    delete req.body.sessionInfo.customer_email;
    req.body.sessionInfo.customer = customer.id;
    let session = await stripeRepository.getStripeSessionByAttribute('customer', customer.id);
    if (!session) session = await stripeRepository.createStripeSession(req.body.sessionInfo);
    
    responseUtils.handleSuccess(httpStatus.OK, 'Success.', { session });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

const stripeGetSubscription = async (req, res) => {
  try {
    let customer = await stripeRepository.getStripeCustomerByAttribute('email', req.query.email);
    if (!customer) customer = await stripeRepository.createStripeCustomer({ email: req.query.email });

    const subscription = await stripeRepository.getStripeSubscriptionByAttribute('customer', customer.id);
    responseUtils.handleSuccess(httpStatus.OK, 'Success.', { subscription });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

const stripeGetProducts = async (req, res) => {
  try {
    const products = await stripeRepository.getStripeProducts();

    responseUtils.handleSuccess(httpStatus.OK, 'Success.', { products });
    return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
      return responseUtils.response(res);
  }
};

export default { stripeGetSubscription, stripecreateProduct, stripeCheckoutSession, stripeGetProducts };
