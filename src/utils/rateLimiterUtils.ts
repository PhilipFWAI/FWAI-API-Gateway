import httpStatus from 'http-status';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request, Response } from 'express';

export const rateLimiter: RateLimitRequestHandler = rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  windowMs: 60 * 1000,
  limit: Number(process.env.REQUEST_LIMIT),
  handler: (req: Request, res: Response) => {
    return res.status(httpStatus.TOO_MANY_REQUESTS).json({ 
      status: httpStatus.TOO_MANY_REQUESTS, 
      message: `Too many requests, only make ${Number(process.env.REQUEST_LIMIT)} requests every 1 minute.` 
    });
  }
});
