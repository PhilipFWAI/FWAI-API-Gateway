import httpStatus from 'http-status';
import { verifyToken } from '../utils/jwtUtils';
import responseUtils from '../utils/responseUtils';
import { comparePassword } from '../utils/passwordUtils';
import authRepository from '../modules/auth/repository/authRepository';
import accountRepository from '../modules/account/repository/accountRepository';
import { ACCESS_TOKEN, ACCOUNT_TYPE, DEVICE_ID, EMAIL, ID, PLATFORM, USER_ID } from '../utils/variablesUtils';


const isUserExist = async (req, res, next) => {
    try {
        const userExist = await authRepository.findUserByAttributes({ primaryKey: EMAIL, primaryValue: req.body.email });
        if (userExist) {
            if (userExist.is_verified) {
                responseUtils.handleError(httpStatus.BAD_REQUEST, 'Account already exists.');
                return responseUtils.response(res);
            }

            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Account already exists. Please verify your account.');
            return responseUtils.response(res);
        }
  
        return next();
    } catch (error) {    
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isAccountVerified = async (req, res, next) => {
    try {
      const verifiedToken = await verifyToken(req.params.access_token, process.env.JWT_SECRET as string);
      const session = await authRepository.findSessionByAttributes({ primaryKey: USER_ID, primaryValue: verifiedToken.id, secondaryKey: ACCESS_TOKEN, secondaryValue: req.params.access_token });
      if (!session) {
        responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Email verification link expired or invalid.');
        return responseUtils.response(res);
      }
  
      const user = await authRepository.findUserByAttributes({ primaryKey: ID, primaryValue: verifiedToken.id });
      if (!user) {
        responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Account email not found.');
        return responseUtils.response(res);
      }

      if (user.is_verified) {
        responseUtils.handleError(httpStatus.BAD_REQUEST, 'Account already verified, now login');
        return responseUtils.response(res);
      }
  
      req.session = session;
      req.user = user;
      return next();
    } catch (error) {    
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isCredentialExist = async (req, res, next) => {
    try {
        const deviceId = JSON.stringify(req.headers['user-device']);
        const user = await authRepository.findUserByAttributes({ primaryKey: EMAIL, primaryValue: req.body.email });
        if (!user) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
            return responseUtils.response(res);
        }
        
        if (!user.is_verified) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Account is not verified. Please verify your account to login.');
            return responseUtils.response(res);
        }

        const passwordMatches = await comparePassword(req.body.password, user.password);
        if (!passwordMatches) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
            return responseUtils.response(res);
        }

        const session = await authRepository.findSessionByAttributes({ primaryKey: USER_ID, primaryValue: user.id, secondaryKey: DEVICE_ID, secondaryValue: deviceId });
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
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isAccountTypeExist = async (req, res, next) => {
    try {
        const accountTypeExist = await accountRepository.findAccountTypeByAttributes({ primaryKey: ACCOUNT_TYPE, primaryValue: req.body.accountType });
        if (accountTypeExist) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Account type already exists.');
            return responseUtils.response(res);
        }
  
        return next();
    } catch (error) {    
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
        return responseUtils.response(res);
    }
};

const isAuthPlatformExist = (platform: string) => {
    return async (req, res, next) => {
        try {
            const authPlatformExist = await authRepository.findAuthPlatformByAttributes({ primaryKey: USER_ID, primaryValue: req.user.id, secondaryKey: PLATFORM, secondaryValue: platform });
            if(authPlatformExist) {
                const data = await authRepository.updateAuthPlatform({ user_id: req.user.id, platform: platform, access_token: req.body.access_token, refresh_token: req.body.refresh_token });
                responseUtils.handleSuccess(httpStatus.OK, 'Success.', { token: data });
                return responseUtils.response(res);
            }

            req.body.platform = platform;
            return next();
        } catch (error) {    
            responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
            return responseUtils.response(res);
        }
    };
};

const isAuthPlatformTokenExist = (platform: string) => {
    return async (req, res, next) => {
        try {
            const authPlatformExist = await authRepository.findAuthPlatformByAttributes({ primaryKey: USER_ID, primaryValue: req.user.id, secondaryKey: PLATFORM, secondaryValue: platform });
            if (!authPlatformExist) {
                responseUtils.handleError(httpStatus.NOT_FOUND, 'Account auth tokens didn`t saved and not found');
                return responseUtils.response(res);
            }

            req.authPlatform = { access_token: authPlatformExist.access_token, refresh_token: authPlatformExist.refresh_token };
            return next();
        } catch (error) {    
            responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
            return responseUtils.response(res);
        }
    };
};

export {
    isUserExist,
    isAccountVerified,
    isCredentialExist,
    isAccountTypeExist,
    isAuthPlatformExist,
    isAuthPlatformTokenExist
};
