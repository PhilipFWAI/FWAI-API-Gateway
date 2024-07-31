export interface SuccessResponseInterface {
    message: string;
    status: number;
    data: unknown;
}
export interface ErrorResponseInterface {
    status: number;
    error: any;
}
class ResponseUtil {
    static message = '';
    static statusCode = 200;
    static data: any = null;
    static error: any = null;
    static type: 'success' | 'error' = 'success';

    static handleSuccess(statusCode: number, message: string, data: any): void {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }

    static handleError(statusCode: number, error: string): void {
        this.statusCode = statusCode;
        this.error = error;
        this.type = 'error';
    }
    
    static response(res): void {
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
