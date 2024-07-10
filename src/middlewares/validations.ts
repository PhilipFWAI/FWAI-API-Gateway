import Joi from 'joi';
import httpStatus from 'http-status';
import { verifyToken } from '../utils/jwtUtils';
import { Request, Response, NextFunction } from 'express';
import authRepositories from '../modules/auth/repository/authRepositories';

const isBodyValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage });
      }
  
      return next();
    } catch (error: unknown) {    
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
    }
};

const isHeaderValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = schema.validate(req.headers, { abortEarly: false });
        if (error) {
          const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
          return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage });
        }
    
        return next();
    } catch (error: unknown) {    
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
    }
};

const isUserExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userExist = await authRepositories.findUserByAttributes('email', req.body.email);
        if (userExist) {
            if (userExist.isVerified) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR,  error: 'Account already exists.', });
            }

            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: 'Account already exists. Please verify your account.' });
        }
  
        return next();
    } catch (error: unknown) {    
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
    }
};

const isAccountVerified = async (req: any, res: Response, next: NextFunction) => {
    try {
      const verifiedToken = await verifyToken(req.params.access_token, process.env.JWT_SECRET as string);
      const session = await authRepositories.findSessionByAttributes('userId', verifiedToken.id, 'access_token', req.params.access_token);
      if (!session) return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: 'Email verification link expired or invalid.' });
  
      const user = await authRepositories.findUserByAttributes('id', verifiedToken.id );
      if (!user) return res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND, error: 'Account email not found.' });
      if (user.isVerified) return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: 'Account already verified, now login' });
  
      req.session = session;
      req.user = user;
      next();
    } catch (error: unknown) {    
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
    }
};
  
export { isBodyValidation, isHeaderValidation, isUserExist, isAccountVerified };
