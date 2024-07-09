import Joi from 'joi';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import authRepositories from '../modules/auth/repository/authRepositories';

const isBodyValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: errorMessage });
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

export { isBodyValidation, isUserExist };
