import Joi from 'joi';
import httpStatus from 'http-status';
import responseUtils from '../utils/responseUtils';

const isHeaderValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
    try {
        const { error } = schema.validate(req.headers, { abortEarly: false });
        if (error) {
            const errorMessage = `${error.details[0].message} in the headers.`;
            responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
            return responseUtils.response(res);
        }
    
        return next();
    } catch (error) {    
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isQueryValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
  try {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
        const errorMessage = `${error.details[0].message} in the query params.`;
        responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
        return responseUtils.response(res);
    }

    return next();
    } catch (error) {    
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isBodyValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = `${error.details[0].message} in the body.`;
        responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
        return responseUtils.response(res);
      }
  
      return next();
    } catch (error) {    
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

export { isHeaderValidation, isQueryValidation, isBodyValidation };
