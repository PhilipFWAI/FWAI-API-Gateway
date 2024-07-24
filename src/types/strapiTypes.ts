import Stripe from 'stripe';

export interface CustomerInterface {
    email: string;
}

export interface ProductInfoInterface {
    id?: string;
    name: string;
}

export interface PriceInfoInterface {
    id?: string;
    product: string  | Stripe.Product | Stripe.DeletedProduct;
}
