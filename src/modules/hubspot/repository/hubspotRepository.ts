import axios from 'axios';
import { URLSearchParams } from 'url';
import authRepository from '../../auth/repository/authRepository';
import { PLATFORM, USER_ID } from '../../../utils/variablesUtils';

const handleHubspotAuth = async (auth, user_id) => {
    const data  = new URLSearchParams({
        ...auth,
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: process.env.HUBSPOT_AUTH_REDIRECT_URL,
    });

    const response = await axios.post('https://api.hubapi.com/oauth/v1/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
    const authPlatformExist = await authRepository.findAuthPlatformByAttributes({ primaryKey: USER_ID, primaryValue: user_id, secondaryKey: PLATFORM, secondaryValue: 'hubspot' });
    if(authPlatformExist) await authRepository.updateAuthPlatform({ user_id, platform: 'hubspot', access_token: response.data.access_token, refresh_token: response.data.refresh_token });
    if(!authPlatformExist) await authRepository.createAuthPlatform({ user_id, platform: 'hubspot', access_token: response.data.access_token, refresh_token: response.data.refresh_token });

    return response;
};

export default {
    handleHubspotAuth
};
