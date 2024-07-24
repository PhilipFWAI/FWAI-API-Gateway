import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';
import authRepositories from '../repository/authRepositories';
import { smtpGmailSendEmail } from './../../../services/sendEmail';
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwtUtils';
import { ACCESS_TOKEN, ID, IS_VERIFIED, USER_ID } from './../../../utils/variablesUtils';

const signup = async (req, res) => {
  try {
    const user = await authRepositories.createUser(req.body);
    const deviceId = JSON.stringify(req.headers['user-device']);

    const refreshToken: string = generateRefreshToken(42);
    const accessToken: string = generateAccessToken(user.id, process.env.JWT_SECRET as string);

    const session = {
      user_id: user.id,
      device_id: deviceId,
      access_token: accessToken,
      refresh_token: refreshToken
    };
    await authRepositories.createSession(session);

    const email = {
      receiverEmail: user.email,
      action: 'Verification Account',
      url: `${process.env.API_GATEWAY_BASE_URL}/api-gateway/auth/verify-email/${accessToken}`,
    };
    await smtpGmailSendEmail(email);

    responseUtils.handleSuccess(httpStatus.CREATED, 'Account created successfully. Please check Email Box to verify account.', { user });
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const verifyEmail = async (req, res) => {
  try {
    await authRepositories.updateUserByAttributes({ updatedKey: IS_VERIFIED, updatedValue: true, whereKey: ID, whereValue: req.user.id });
    await authRepositories.destroySessionByAttribute({ primaryKey: USER_ID, primaryValue: req.user.id, secondaryKey: ACCESS_TOKEN, secondaryValue: req.session.access_token });

    responseUtils.handleSuccess(httpStatus.OK, 'Account verified successfully, now you can login', {});
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const signin = async (req, res) => {
  try {
    if (req.session) return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Logged in successfully', data: { user: req.user, session: req.session } });

    const refreshToken: string = generateRefreshToken(42);
    const accessToken: string = generateAccessToken(req.user.id, process.env.JWT_SECRET as string);

    const sessionBody = {
      user_id: req.user.id,
      device_id: req.deviceId,
      access_token: accessToken,
      refresh_token: refreshToken
    };

    const session = await authRepositories.createSession(sessionBody);
    
    responseUtils.handleSuccess(httpStatus.OK, 'Logged in successfully', { user: req.user, session });
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const signout = async (req, res) => {
  try {
    await authRepositories.destroySessionByAttribute({ primaryKey: USER_ID, primaryValue: req.user.id, secondaryKey: ACCESS_TOKEN, secondaryValue : req.session.access_token });
    
    responseUtils.handleSuccess(httpStatus.OK, 'Logged out Successfully', {});
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

export default { signup, verifyEmail, signin, signout };
