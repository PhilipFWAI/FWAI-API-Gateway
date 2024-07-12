import Stripe from 'stripe';
import { stripe } from '../../../services/stripe';

const createStrapiCustomer = async (body: Stripe.CustomerCreateParams): Promise<Stripe.Customer> => {
    return await stripe.customers.create(body);
};

const getStrapiCustomerByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Customer> => {
    const customer = await stripe.customers.search({ query: `${primaryKey}: '${primaryValue}'` });
    return customer.data[0];
};

const createStrapiProduct = async (body: Stripe.ProductCreateParams): Promise<Stripe.Product> => {
    return await stripe.products.create(body);
};

const getStrapiProductByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Product> => {
    const product = await stripe.products.search({ query: `${primaryKey}: '${primaryValue}'` });
    return product.data[0];
};

const createStrapiPrice = async (body: Stripe.PriceCreateParams): Promise<Stripe.Price> => {
    return await stripe.prices.create(body);
};

const getStrapiPricesByAttribute = async (primaryKey: string, primaryValue: number | string | boolean): Promise<Stripe.Price> => {
    const price = await stripe.prices.search({ query: `${primaryKey}: '${primaryValue}'` });
    return price.data[0];
};

const createStrapiSubscription= async (body: Stripe.SubscriptionCreateParams): Promise<Stripe.Subscription> => {
    return await stripe.subscriptions.create(body);
};

const getStrapiSubscriptionByAttribute = async (primaryKey: string, primaryValue: number | string | boolean, secondaryKey: string, secondaryValue: number | string | boolean): Promise<Stripe.Subscription> => {
    const subscription = await stripe.subscriptions.list({ [primaryKey]: primaryValue, [secondaryKey]: secondaryValue });
    return subscription.data[0];
};

const createStrapiSession = async (body: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Checkout.Session> => {
    return await stripe.checkout.sessions.create(body);
};

const getStrapiSessionByAttribute = async (primaryKey: string, primaryValue: number | string | boolean, secondaryKey: string, secondaryValue: number | string | boolean): Promise<Stripe.Checkout.Session> => {
    const subscription = await stripe.checkout.sessions.list({ [primaryKey]: primaryValue, [secondaryKey]: secondaryValue });
    return subscription.data[0];
};

export default {
    createStrapiCustomer,
    getStrapiCustomerByAttribute,
    createStrapiProduct,
    getStrapiProductByAttribute,
    createStrapiPrice,
    getStrapiPricesByAttribute,
    createStrapiSubscription,
    getStrapiSubscriptionByAttribute,
    createStrapiSession,
    getStrapiSessionByAttribute
};
