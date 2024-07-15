import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ExtendRequest } from '../../../types/commonTypes';
import stripeRepositories from '../repository/stripeRepositories';
import { customerInfoUtil } from '../../../utils/customerInfoUtils';
import { PriceInfoInterface, ProductInfoInterface } from '../../../types/strapiTypes';

const stripeCustomer = async (req: ExtendRequest, res: Response) => {
  try {
    const customerInfo = await customerInfoUtil(req);
    let customer = await stripeRepositories.getStrapiCustomerByAttribute('email', customerInfo.email);
    if (!customer) customer = await stripeRepositories.createStrapiCustomer(customerInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe customer created successfully.', data: { customer } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripePlan = async (req: ExtendRequest, res: Response) => {
  try {
    let product: ProductInfoInterface = await stripeRepositories.getStrapiProductByAttribute('name', req.body.planInfo.name);
    if (!product) product = await stripeRepositories.createStrapiProduct(req.body.planInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe plan created successfully.', data: { product } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripePrice = async (req: ExtendRequest, res: Response) => {
  try {
    let price: PriceInfoInterface = await stripeRepositories.getStrapiPricesByAttribute('product', req.body.priceInfo.product);
    if (!price) price = await stripeRepositories.createStrapiPrice(req.body.priceInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe price created successfully.', data: { price } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripePayment = async (req: ExtendRequest, res: Response) => {
  try {
    let payment = await stripeRepositories.getStrapiPaymentByAttribute('customer', req.body.paymentInfo.customer);
    if (!payment) payment = await stripeRepositories.createStrapiPayment(req.body.paymentInfo.customer, req.body.paymentInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment creted successfully.', data: { payment } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeSubscription = async (req: ExtendRequest, res: Response) => {
  try {
    let subscription = await stripeRepositories.getStrapiSubscriptionByAttribute('customer', req.body.subscriptionInfo.customer, 'price', req.body.subscriptionInfo.items[0].price);
    if (!subscription) subscription = await stripeRepositories.createStrapiSubscription(req.body.subscriptionInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe subscription created successfully.', data: { subscription } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCheckoutSubscription = async (req: ExtendRequest, res: Response) => {
  try {
    let session = await stripeRepositories.getStrapiSessionByAttribute('customer', req.body.sessionInfo.customer, 'subscription', req.body.sessionInfo.subscription);
    delete req.body.sessionInfo.subscription;
    if (!session) session = await stripeRepositories.createStrapiSession(req.body.sessionInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment checked-out successfully.', data: { session } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const stripeCheckoutSubscriptionCompleteFlow = async (req: ExtendRequest, res: Response) => {
  try {
    const customerInfo = await customerInfoUtil(req);
    let customer = await stripeRepositories.getStrapiCustomerByAttribute('email', customerInfo.email);
    if (!customer) customer = await stripeRepositories.createStrapiCustomer(customerInfo);

    let product: ProductInfoInterface = await stripeRepositories.getStrapiProductByAttribute('name', req.body.planInfo.name);
    if (!product) product = await stripeRepositories.createStrapiProduct(req.body.planInfo);

    req.body.priceInfo.product = product.id;
    let price: PriceInfoInterface = await stripeRepositories.getStrapiPricesByAttribute('product', req.body.priceInfo.product);
    if (!price) price = await stripeRepositories.createStrapiPrice(req.body.priceInfo);

    let payment = await stripeRepositories.getStrapiPaymentByAttribute('customer', customer.id);
    if (!payment) payment = await stripeRepositories.createStrapiPayment(customer.id, req.body.paymentInfo);


    let subscription = await stripeRepositories.getStrapiSubscriptionByAttribute('customer', customer.id, 'price', price.id);
    if (!subscription) subscription = await stripeRepositories.createStrapiSubscription({ customer: customer.id, default_payment_method: payment.id, items: [ { price: price.id }, ], });

    req.body.sessionInfo.customer = customer.id;
    req.body.sessionInfo.subscription = subscription.id;
    let session = await stripeRepositories.getStrapiSessionByAttribute('customer', customer.id, 'subscription', subscription.id);
    if (!session) session = await stripeRepositories.createStrapiSession(req.body.sessionInfo);

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Stripe payment checked-out successfully.', data: { session, customer, product, price, subscription } });
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

export default { stripeCustomer, stripePlan, stripePrice, stripePayment, stripeSubscription, stripeCheckoutSubscription, stripeCheckoutSubscriptionCompleteFlow, stripeCheckoutSucceeded, stripeCheckoutCancelled };
