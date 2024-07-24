export interface SuccessResponseInterface {
    message: string;
    status: number;
    data: unknown;
}

export interface ErrorResponseInterface {
    status: number;
    error: any;
}
