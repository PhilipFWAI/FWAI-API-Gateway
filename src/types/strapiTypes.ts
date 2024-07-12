import Stripe from 'stripe';

export interface CustomerInterface {
    email: string;
}

export interface ProductInfoInterface {
    name: string;
}

export interface PriceInfoInterface {
    id?: string;
    product: string  | Stripe.Product | Stripe.DeletedProduct;
}
