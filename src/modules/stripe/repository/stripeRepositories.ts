import Stripe from 'stripe';
import { stripe } from '../../../services/stripe';

const getStripeCustomerByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Customer> => {
    const customer = await stripe.customers.search({ query: `${primaryKey}: '${primaryValue}'` });
    return customer.data[0];
};

const createStripeCustomer = async (body: Stripe.CustomerCreateParams): Promise<Stripe.Customer> => {
    return await stripe.customers.create(body);
};

const getStripeProductByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Product> => {
    const product = await stripe.products.search({ query: `${primaryKey}: '${primaryValue}'`});    
    return product.data[0];
};

const createStripePrice = async (body: Stripe.PriceCreateParams): Promise<Stripe.Price> => {
    return await stripe.prices.create(body);
};

const createStripeProduct = async (body: Stripe.ProductCreateParams): Promise<Stripe.Product> => {
    return await stripe.products.create(body);
};

const createStripeSession = async (body: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Checkout.Session> => {
    return await stripe.checkout.sessions.create(body);
};

const getStripeSessionByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Checkout.Session> => {
    const subscription = await stripe.checkout.sessions.list({ [primaryKey]: primaryValue });
    return subscription.data[0];
};

const getStripeSubscriptionByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Subscription> => {
    const subscription = await stripe.subscriptions.list({ [primaryKey]: primaryValue });
    return subscription.data[0];
};

const getStripeProducts = async (): Promise<Stripe.ApiList<Stripe.Product>> => {
    return await stripe.products.list();
};

export default {
    getStripeCustomerByAttribute,
    createStripeCustomer,
    getStripeProductByAttribute,
    createStripePrice,
    createStripeProduct,
    createStripeSession,
    getStripeSessionByAttribute,
    getStripeSubscriptionByAttribute,
    getStripeProducts,
};
