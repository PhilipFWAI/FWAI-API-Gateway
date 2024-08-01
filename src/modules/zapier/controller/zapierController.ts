import axios from 'axios';
import { URLSearchParams } from 'url';
import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';


const zapierAuth = async (req, res) => {
    try {
        console.log('=======>', req);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const zapierAuthCallback = async (req, res) => {
    try {
        console.log('PING - PONG', req.query);

        const payloadObj = {
            code:  req.query.code,
            grant_type: 'authorization_code',
            client_id: process.env.ZAPIER_CLIENT_ID,
            client_secret: process.env.ZAPIER_CLIENT_SECRET,
            redirect_uri: process.env.ZAPIER_AUTH_REDIRECT_URL,
        };

        const payload = new URLSearchParams(payloadObj).toString();
        const response = await axios.post('https://zapier.com/oauth/token', payload, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        console.log('=======>', response);
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { data: response.data});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

export default {
    zapierAuth,
    zapierAuthCallback
};
