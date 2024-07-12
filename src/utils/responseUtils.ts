import { Response } from 'express';
import { ErrorResponseInterface, SuccessResponseInterface } from '../types/commonTypes';

class ResponseUtil {
    static message = '';
    static statusCode = 200;
    static data: unknown = null;
    static error: unknown = null;
    static type: 'success' | 'error' = 'success';

    static handleSuccess(statusCode: number, message: string, data: unknown): void {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }

    static handleError(statusCode: number, message: string): void {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }
    
    static response(res: Response): void {
        if (this.type === 'success') {
            const response: SuccessResponseInterface = {
                status: this.statusCode,
                message: this.message,
                data: this.data,
            };
            res.status(this.statusCode).json(response);
        } else {
            const response: ErrorResponseInterface = {
                status: this.statusCode,
                error: this.error,
            };
            res.status(this.statusCode).json(response);
        }
    }
}

export default ResponseUtil;
