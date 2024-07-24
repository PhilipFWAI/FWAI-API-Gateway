import httpStatus from 'http-status';
import { verifyToken } from '../utils/jwtUtils';
import responseUtils from '../utils/responseUtils';
import { SessionInterface } from '../types/modelsTypes';
import authRepositories from '../modules/auth/repository/authRepositories';
import { ID, USER_ID,ACCESS_TOKEN, DEVICE_ID } from '../utils/variablesUtils';

export const gatewayAuthorization = async (req, res, next) => {
    try {
        let session: SessionInterface;
        const deviceId = JSON.stringify(req.headers['user-device']);
        const authorizationToken = req.header('Authorization').replace('Bearer ', '');
        if (!authorizationToken) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Not authorized');
            return responseUtils.response(res);
        }

        const verifiedToken = await verifyToken(authorizationToken, process.env.JWT_SECRET as string);
        
        if(!deviceId)  session = await authRepositories.findSessionByAttributes({ primaryKey: USER_ID, primaryValue: verifiedToken.id, secondaryKey: ACCESS_TOKEN, secondaryValue: authorizationToken });
        if (deviceId) session = await authRepositories.findSessionByTripleAttributes({ primaryKey: USER_ID, primaryValue: verifiedToken.id, secondaryKey: ACCESS_TOKEN, secondaryValue: authorizationToken, tripleKey: DEVICE_ID, tripleValue: deviceId });

        if (!session) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Not authorized, already logged out');
            return responseUtils.response(res);
        }

        const user = await authRepositories.findUserByAttributes({ primaryKey: ID, primaryValue: verifiedToken.id });
        if (!user) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Not authorized');
            return responseUtils.response(res);
        }

        const accountTypes: number[] = JSON.parse(process.env.ACCOUNT_TYPES);
        if (!accountTypes.includes(user.accountType_id)) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Not authorized');
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
