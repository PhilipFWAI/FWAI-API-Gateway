import crypto from 'crypto';
import { URLSearchParams } from 'url';
import { axiosUtil } from '../../../utils/axiosUtils';
import authRepository from '../../auth/repository/authRepository';
import { PLATFORM, USER_ID } from '../../../utils/variablesUtils';

const handleHubspotAuth = async (auth, user_id) => {
    const data  = new URLSearchParams({
        ...auth,
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: process.env.HUBSPOT_AUTH_REDIRECT_URL,
    });

    const response = await axiosUtil('/oauth/v1/token', 'POST', data);
    const authPlatformExist = await authRepository.findAuthPlatformByAttributes({ [USER_ID]: user_id, [PLATFORM]: 'hubspot' });
    if (authPlatformExist) 
        await authRepository.updateAuthPlatform({
            user_id,
            platform: 'hubspot',
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
        });
    else 
        await authRepository.createAuthPlatform({
            user_id,
            platform: 'hubspot',
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
        });

    return response;
};

const verifyHubspotSignature = async (req, CLIENT_SECRET) => {
    const requestUri = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const timestamp = req.headers['x-hubspot-request-timestamp'];
    const signature = req.headers['x-hubspot-signature-v3'];
    const decodedUri = decodeURIComponent(requestUri);
    const requestBody = JSON.stringify(req.body);
    const age = Math.abs(Date.now() - timestamp);
    const requestMethod = req.method;
    if (age > 300000) return false;

    const concatenation = requestMethod + decodedUri + requestBody + timestamp;
    const hmac = crypto.createHmac('sha256', CLIENT_SECRET);
    hmac.update(concatenation, 'utf-8' as any);
    const hash = hmac.digest('base64');
    if (!signature) return false;
    if (!hash) return false;

    if (crypto.timingSafeEqual(Buffer.from(hash) as any, Buffer.from(signature) as any)) return true;
    else return false;
};

export default {
    handleHubspotAuth,
    verifyHubspotSignature,
};
