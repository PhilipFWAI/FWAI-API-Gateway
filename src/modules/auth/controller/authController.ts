import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';
import authRepository from '../repository/authRepository';
import { smtpGmailSendEmail } from '../../../services/sendEmail';
import { generateAccessToken, generateRandomString } from '../../../utils/jwtUtils';
import { ACCESS_TOKEN, ID, IS_VERIFIED, USER_ID } from '../../../utils/variablesUtils';

const signup = async (req, res) => {
  try {
    const user = await authRepository.createUser(req.body);
    const deviceId = JSON.stringify(req.headers['user-device']);

    const refreshToken: string = generateRandomString();
    const accessToken: string = generateAccessToken(user.id, process.env.JWT_SECRET as string);

    const session = {
      user_id: user.id,
      device_id: deviceId,
      access_token: accessToken,
      refresh_token: refreshToken
    };
    await authRepository.createSession(session);

    const email = {
      receiverEmail: user.email,
      action: 'Verification Account',
      url: `${process.env.API_GATEWAY_BASE_URL}/api-gateway/auth/verify-email/${accessToken}`,
    };
    await smtpGmailSendEmail(email);

    responseUtils.handleSuccess(httpStatus.CREATED, 'Account created successfully. Please check Email Box to verify account.', { user });
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const verifyEmail = async (req, res) => {
  try {
    await authRepository.updateUserByAttributes({ updatedKey: IS_VERIFIED, updatedValue: true, whereKey: ID, whereValue: req.user.id });
    await authRepository.destroySessionByAttribute({ primaryKey: USER_ID, primaryValue: req.user.id, secondaryKey: ACCESS_TOKEN, secondaryValue: req.session.access_token });

    responseUtils.handleSuccess(httpStatus.OK, 'Account verified successfully, now you can login', {});
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const signin = async (req, res) => {
  try {
    if (req.session) return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Logged in successfully', data: { user: req.user, session: req.session } });

    const refreshToken: string = generateRandomString();
    const accessToken: string = generateAccessToken(req.user.id, process.env.JWT_SECRET as string);

    const sessionBody = {
      user_id: req.user.id,
      device_id: req.deviceId,
      access_token: accessToken,
      refresh_token: refreshToken
    };

    const session = await authRepository.createSession(sessionBody);
    
    responseUtils.handleSuccess(httpStatus.OK, 'Logged in successfully', { user: req.user, session });
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const signout = async (req, res) => {
  try {
    await authRepository.destroySessionByAttribute({ primaryKey: USER_ID, primaryValue: req.user.id, secondaryKey: ACCESS_TOKEN, secondaryValue : req.session.access_token });
    
    responseUtils.handleSuccess(httpStatus.OK, 'Logged out Successfully', {});
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const HubspotSaveAuthTokens = async (req, res) => {
  try {
      const data = await authRepository.createAuthPlatform({ user_id: req.user.id, platform: req.body.platform, access_token: req.body.access_token, refresh_token: req.body.refresh_token });
      responseUtils.handleSuccess(httpStatus.OK, 'Success.', { tokens: data });
      return responseUtils.response(res);
  } catch (error) {
      responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
      return responseUtils.response(res);
  }
};

export default {
  signup,
  verifyEmail,
  signin,
  signout, 
  HubspotSaveAuthTokens
};
