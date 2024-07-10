import httpStatus from 'http-status';
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import authRepositories from '../modules/auth/repository/authRepositories';

export const accountAuthorization = function (accountTypes: string[]) {
    return async (req: any, res: Response, next: NextFunction) => {
    try {
        const deviceId = JSON.stringify(req.headers['user-device']);
        const authorizationToken = req.header('authorization').replace('Bearer ', '');
        if (!authorizationToken) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, error: 'Not authorized' });

        const verifiedToken = await verifyToken(authorizationToken, process.env.JWT_SECRET as string);
        const session = await authRepositories.findSessionByTripleAttributes('user_id', verifiedToken.id, 'access_token', authorizationToken, 'device_id', deviceId);
        if (!session) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, error: 'Not authorized, already logged out' });

        const user = await authRepositories.findUserByAttributes('id', verifiedToken.id );
        if (!user) return res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND, error: 'Not authorized' });
        
        if (!accountTypes.includes(user.accountType_id.toString())) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: 'Not authorized' });
            
        req.user = user;
        req.session = session;
        next();
    } catch (error: unknown) {    
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error });
    }
  };
};
