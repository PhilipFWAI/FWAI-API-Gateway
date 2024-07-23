import Joi from 'joi';
import httpStatus from 'http-status';
import { verifyToken } from '../utils/jwtUtils';
import responseUtils from '../utils/responseUtils';
import { comparePassword } from '../utils/passwordUtils';
import authRepositories from '../modules/auth/repository/authRepositories';
import accountRepositories from '../modules/account/repository/accountRepositories';
import { ACCESS_TOKEN, ACCOUNT_TYPE, DEVICE_ID, EMAIL, ID, USER_ID } from '../utils/variablesUtils';

const isHeaderValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
    try {
        const { error } = schema.validate(req.headers, { abortEarly: false });
        if (error) {
            const errorMessage = `${error.details[0].message} in the headers`;
            responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
            return responseUtils.response(res);
        }
    
        return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isParamValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
  try {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
        const errorMessage = `${error.details[0].message} in the params`;
        responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
        return responseUtils.response(res);
    }

    return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isQueryValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
  try {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
        const errorMessage = `${error.details[0].message} in the query params`;
        responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
        return responseUtils.response(res);
    }

    return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isBodyValidation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = `${error.details[0].message} in the body`;
        responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
        return responseUtils.response(res);
      }
  
      return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isUserExist = async (req, res, next) => {
    try {
        const userExist = await authRepositories.findUserByAttributes({ primaryKey: EMAIL, primaryValue: req.body.email });
        if (userExist) {
            if (userExist.isVerified) {
                responseUtils.handleError(httpStatus.BAD_REQUEST, 'Account already exists.');
                return responseUtils.response(res);
            }

            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Account already exists. Please verify your account.');
            return responseUtils.response(res);
        }
  
        return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isAccountVerified = async (req, res, next) => {
    try {
      const verifiedToken = await verifyToken(req.params.access_token, process.env.JWT_SECRET as string);
      const session = await authRepositories.findSessionByAttributes({ primaryKey: USER_ID, primaryValue: verifiedToken.id, secondaryKey: ACCESS_TOKEN, secondaryValue: req.params.access_token });
      if (!session) {
        responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Email verification link expired or invalid.');
        return responseUtils.response(res);
      }
  
      const user = await authRepositories.findUserByAttributes({ primaryKey: ID, primaryValue: verifiedToken.id });
      if (!user) {
        responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Account email not found.');
        return responseUtils.response(res);
      }

      if (user.isVerified) {
        responseUtils.handleError(httpStatus.BAD_REQUEST, 'Account already verified, now login');
        return responseUtils.response(res);
      }
  
      req.session = session;
      req.user = user;
      return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isCredentialExist = async (req, res, next) => {
    try {
        const deviceId = JSON.stringify(req.headers['user-device']);
        const user = await authRepositories.findUserByAttributes({ primaryKey: EMAIL, primaryValue: req.body.email });
        if (!user) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
            return responseUtils.response(res);
        }
        
        if (!user.isVerified) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Account is not verified. Please verify your account to login.');
            return responseUtils.response(res);
        }

        const passwordMatches = await comparePassword(req.body.password, user.password);
        if (!passwordMatches) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
            return responseUtils.response(res);
        }

        const session = await authRepositories.findSessionByAttributes({ primaryKey: USER_ID, primaryValue: user.id, secondaryKey: DEVICE_ID, secondaryValue: deviceId });
        if (!session) {
            req.user = user;
            req.session = null;
            req.deviceId = deviceId;
            return next();
        }

        req.user = user;
        req.session = session;
        req.deviceId = deviceId;
        return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isAccountTypeExist = async (req, res, next) => {
    try {
        const accountTypeExist = await accountRepositories.findAccountTypeByAttributes({ primaryKey: ACCOUNT_TYPE, primaryValue: req.body.accountType });
        if (accountTypeExist) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Account type already exists.');
            return responseUtils.response(res);
        }
  
        return next();
    } catch (error) {    
        responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};
  
export { isHeaderValidation, isParamValidation, isQueryValidation, isBodyValidation, isUserExist, isAccountVerified, isCredentialExist, isAccountTypeExist };
