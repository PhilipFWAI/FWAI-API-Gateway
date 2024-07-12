import { Request } from 'express';
import { UsersInterface } from './modelsTypes';

export interface SuccessResponseInterface {
    message: string;
    status: number;
    data: unknown;
}

export interface ErrorResponseInterface {
    status: number;
    error: unknown;
}

export interface ExtendRequest extends Request {
    user?: UsersInterface;
}
