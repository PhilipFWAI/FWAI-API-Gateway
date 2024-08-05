import axios from 'axios';
import httpStatus from 'http-status';
import { URLSearchParams } from 'url';
import responseUtils from '../../../utils/responseUtils';
import { HUBSPOT_CONTACTS } from '../../../utils/hubspotUtils';
import hubspotRepository from '../repository/hubspotRepository';
import authRepository from '../../auth/repository/authRepository';

const hubspotAuth = async (req, res) => {
    try {
        const hubspotAuth = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${process.env.HUBSPOT_AUTH_REDIRECT_URL}&response_type=code&scope=${process.env.HUBSPOT_SCOPE}&state=${process.env.GENERAL_AUTH_STATE}`;
        return res.redirect(hubspotAuth);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
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
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotAuthRefreshAccessToken = async (req, res) => {
    try {
        const response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { token: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const saveHubspotAuthTokens = async (req, res) => {
    try {
        const data = await authRepository.createAuthPlatform({ user_id: req.user.id, platform: req.body.platform, access_token: req.body.access_token, refresh_token: req.body.refresh_token });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { token: data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetContactById = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_CONTACTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetContactByEmail = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_CONTACTS}/${req.params.email}?idProperty=email`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListContacts = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(HUBSPOT_CONTACTS, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { token: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateContact = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(HUBSPOT_CONTACTS, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateContact = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.patch(`${HUBSPOT_CONTACTS}/${req.params.id}`, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteContact = async (req, res) => {
    try {
        const response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        await axios.delete(`${HUBSPOT_CONTACTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.statusText || error.response.data.message || error.toString());
        return responseUtils.response(res);
    }
};

export default {
    hubspotAuth,
    hubspotAuthCallback,
    hubspotAuthRefreshAccessToken,
    saveHubspotAuthTokens,
    hubspotGetContactById,
    hubspotListContacts,
    hubspotCreateContact,
    hubspotUpdateContact,
    hubspotDeleteContact,
    hubspotGetContactByEmail
};
