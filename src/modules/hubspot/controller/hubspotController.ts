import axios from 'axios';
import httpStatus from 'http-status';
import { URLSearchParams } from 'url';
import responseUtils from '../../../utils/responseUtils';

const hubspotAuth = async (req, res) => {
    try {
        const hubspotAuth = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${process.env.HUBSPOT_AUTH_REDIRECT_URL}&response_type=code&scope=${process.env.HUBSPOT_SCOPE}&state=${process.env.GENERAL_AUTH_STATE}`;
        return res.redirect(hubspotAuth);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotAuthCallback = async (req, res) => {
    try {
        const data  = new URLSearchParams({
            code: req.query.code,
            grant_type: 'authorization_code',
            client_id: process.env.HUBSPOT_CLIENT_ID,
            client_secret: process.env.HUBSPOT_CLIENT_SECRET,
            redirect_uri: process.env.HUBSPOT_AUTH_REDIRECT_URL,
        });

        if (req.query.state !== process.env.GENERAL_AUTH_STATE) {
            responseUtils.handleError(httpStatus.UNAUTHORIZED, 'Invalid authorization code');
            return responseUtils.response(res);
        }

        const response = await axios.post('https://api.hubapi.com/oauth/v1/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { authHubspotCode: req.query.code, token: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotAuthRefreshAccessToken = async (req, res) => {
    try {
        const data  = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: req.query.refreshToken,
            client_id: process.env.HUBSPOT_CLIENT_ID,
            client_secret: process.env.HUBSPOT_CLIENT_SECRET,
            redirect_uri: process.env.HUBSPOT_AUTH_REDIRECT_URL,
        });

        const response = await axios.post('https://api.hubapi.com/oauth/v1/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { token: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

export default {
    hubspotAuth,
    hubspotAuthCallback,
    hubspotAuthRefreshAccessToken
};
