
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'POST, GET,  PUT, PATCH, DELETE, HEAD',
    allowedHeaders: ['Content-Type', 'Gateway-Authorization', 'User-Device'],
};
