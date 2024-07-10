import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendEmail from '../../../services/sendEmail';
import authRepositories from '../repository/authRepositories';
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwtUtils';

const signup = async (req: Request, res: Response) => {
  try {
    const user = await authRepositories.createUser(req.body);

    const refreshToken: string = generateRefreshToken(42);
    const deviceId = JSON.stringify(req.headers['user-device']);
    const accessToken: string = generateAccessToken(user.id, process.env.JWT_SECRET as string);
    await authRepositories.createSession({ userId: user.id, deviceId, access_token: accessToken, refresh_token: refreshToken });
    await sendEmail(`${process.env.API_GATEWAY_BASE_URL}/api-gateway/auth/verify-email/${accessToken}`, 'Verification Account',  user.email, user.password );

    return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: 'Account created successfully. Please check Email Box to verify account.', data: { user } });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

const verifyEmail = async (req: any, res: Response) => {
  try {
    await authRepositories.updateUserByAttributes('isVerified', true, 'id', req.user.id);
    await authRepositories.destroySessionByAttribute('userId', req.user.id, 'access_token', req.session.access_token);
    res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Account verified successfully, now login' });
  } catch (error: unknown) {    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
  }
};

export default { signup, verifyEmail };
