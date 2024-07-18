import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ExtendRequest } from '../../../types/commonTypes';
import stripeRepositories from '../repository/stripeRepositories';
import { customerInfoUtil } from '../../../utils/customerInfoUtils';
import { PriceInfoInterface, ProductInfoInterface } from '../../../types/strapiTypes';

const stripeGetSubscription = async (req: ExtendRequest, res: Response) => {
  try {
    const subscription = await stripeRepositories.getStripeSubscriptionByAttribute('customer', req.params.customerId);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe subscription proceed successfully.', data: { subscription } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCustomer = async (req: ExtendRequest, res: Response) => {
  try {
    const customerInfo = await customerInfoUtil(req);
    let customer = await stripeRepositories.getStripeCustomerByAttribute('email', customerInfo.email);
    if (!customer) customer = await stripeRepositories.createStripeCustomer(customerInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe customer proceed successfully.', data: { customer } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripePlan = async (req: ExtendRequest, res: Response) => {
  try {
    let product: ProductInfoInterface = await stripeRepositories.getStripeProductByAttribute('name', req.body.planInfo.name);
    if (!product) product = await stripeRepositories.createStripeProduct(req.body.planInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe plan proceed successfully.', data: { product } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripePrice = async (req: ExtendRequest, res: Response) => {
  try {
    let price: PriceInfoInterface = await stripeRepositories.getStripePricesByAttribute('product', req.body.priceInfo.product);
    if (!price) price = await stripeRepositories.createStripePrice(req.body.priceInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe price proceed successfully.', data: { price } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCheckoutSession = async (req: ExtendRequest, res: Response) => {
  try {
    let session = await stripeRepositories.getStripeSessionByAttribute('customer', req.body.sessionInfo.customer);
    delete req.body.sessionInfo.subscription;
    if (!session) session = await stripeRepositories.createStripeSession(req.body.sessionInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment checked-out proceed successfully.', data: { session } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCheckoutSessionCompleteFlow = async (req: ExtendRequest, res: Response) => {
  try {
    const customerInfo = await customerInfoUtil(req);
    let customer = await stripeRepositories.getStripeCustomerByAttribute('email', customerInfo.email);
    if (!customer) customer = await stripeRepositories.createStripeCustomer(customerInfo);

    let product: ProductInfoInterface = await stripeRepositories.getStripeProductByAttribute('name', req.body.planInfo.name);
    if (!product) product = await stripeRepositories.createStripeProduct(req.body.planInfo);

    req.body.priceInfo.product = product.id;
    let price: PriceInfoInterface = await stripeRepositories.getStripePricesByAttribute('product', req.body.priceInfo.product);
    if (!price) price = await stripeRepositories.createStripePrice(req.body.priceInfo);

    req.body.sessionInfo.customer = customer.id;
    let session = await stripeRepositories.getStripeSessionByAttribute('customer', customer.id);
    if (!session) session = await stripeRepositories.createStripeSession(req.body.sessionInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment checked-out proceed successfully.', data: { session, customer, product, price } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCheckoutSucceeded = async (req: Request, res: Response) => {
  try {
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment proceed successfully.' });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCheckoutCancelled = async (req: Request, res: Response) => {
  try {
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment cancelled successfully.' });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

export default { stripeGetSubscription, stripeCustomer, stripePlan, stripePrice, stripeCheckoutSession, stripeCheckoutSessionCompleteFlow, stripeCheckoutSucceeded, stripeCheckoutCancelled };
