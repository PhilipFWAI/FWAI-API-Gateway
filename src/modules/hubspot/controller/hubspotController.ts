import axios from 'axios';
import httpStatus from 'http-status';
import { URLSearchParams } from 'url';
import responseUtils from '../../../utils/responseUtils';
import hubspotRepository from '../repository/hubspotRepository';
import { HUBSPOT_ANALYTICS, HUBSPOT_COMPANIES, HUBSPOT_CONTACTS, HUBSPOT_CUSTOM_OBJECTS, HUBSPOT_DEALS, HUBSPOT_OWNERS, HUBSPOT_PIPELINES } from '../../../utils/hubspotUtils';

const hubspotAuth = async (req, res) => {
    try {
        const hubspotAuth = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${process.env.HUBSPOT_AUTH_REDIRECT_URL}&response_type=code&scope=${process.env.HUBSPOT_SCOPE}&state=${process.env.GENERAL_AUTH_STATE}`;
        return res.redirect(hubspotAuth);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
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
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { tokens: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotAuthRefreshAccessToken = async (req, res) => {
    try {
        const response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { tokens: response.data });
        return responseUtils.response(res);
    } catch (error) {
        console.log('======>', error);
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetOwnersByEmail = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_OWNERS}/?email=${req.params.email}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetContactsByEmail = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_CONTACTS}/${req.params.email}?idProperty=email`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetContactsById = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_CONTACTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotSearchContacts = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(`${HUBSPOT_CONTACTS}/search`, req.body, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListContacts = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(HUBSPOT_CONTACTS, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateContacts = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(HUBSPOT_CONTACTS, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateContacts = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.patch(`${HUBSPOT_CONTACTS}/${req.params.id}`, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteContacts = async (req, res) => {
    try {
        const response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        await axios.delete(`${HUBSPOT_CONTACTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListCompanies = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(HUBSPOT_COMPANIES, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { companies: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateCompanies = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(HUBSPOT_COMPANIES, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { company: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateCompanies = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.patch(`${HUBSPOT_COMPANIES}/${req.params.id}`, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { company: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteCompanies = async (req, res) => {
    try {
        const response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        await axios.delete(`${HUBSPOT_COMPANIES}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListCustomObjects = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(HUBSPOT_CUSTOM_OBJECTS, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { customObjects: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateCustomObjects = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(HUBSPOT_CUSTOM_OBJECTS, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { customObject: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateCustomObjects = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.patch(HUBSPOT_CUSTOM_OBJECTS, { properties: req.body}, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' }});

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { customObject: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteCustomObjects = async (req, res) => {
    try {
        const response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        await axios.delete(`${HUBSPOT_CUSTOM_OBJECTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListPipelines = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_PIPELINES}/deals`, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });
        
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelines: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetPipeline = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_PIPELINES}/deals/${req.params.pipelineId}/stages`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });
        
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreatePipelines = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(`${HUBSPOT_PIPELINES}/deals`, req.body, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });
        
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeletePipelines = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.delete(`${HUBSPOT_PIPELINES}/deals/${req.params.pipelineId}`, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });
        
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdatePipelines = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.patch(`${HUBSPOT_PIPELINES}/deals/${req.params.pipelineId}`, req.body, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });
        
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateDeals = async (req, res) => {
    try {
        req.body.closedate = new Date(req.body.closedate).toISOString();
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.post(`${HUBSPOT_DEALS}`, { properties: req.body }, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { deal: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateDeals = async (req, res) => {
    try {
        req.body?.closedate && (req.body.closedate = new Date(req.body.closedate).toISOString());
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.patch(`${HUBSPOT_DEALS}/${req.params.dealId}`, { properties: req.body }, { headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { deal: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListDeals = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(HUBSPOT_DEALS, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListAnalyticsReports = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_ANALYTICS}/v1/reports/data`, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListAnalyticsEvents = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_ANALYTICS}/v1/events`, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListAnalyticsViews = async (req, res) => {
    try {
        let response = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);
        response = await axios.get(`${HUBSPOT_ANALYTICS}/v1/views`, { params: req.query, headers: { 'Authorization': `Bearer ${response.data.access_token}`, 'Content-Type': 'application/json' } });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotWebhook = async (req, res) => {
    try {
        const isValidSignature  = await hubspotRepository.verifyHubspotSignature(req, process.env.HUBSPOT_CLIENT_SECRET);
        if (!isValidSignature ) {            
            responseUtils.handleError(httpStatus.FORBIDDEN, 'Forbidden: Invalid signature');
            return responseUtils.response(res);
        }

        // Functionalities to send notification with triggered events
        console.log(isValidSignature, 'Implement Logic To Send Notification With Triggered Events');
        console.log(req.body);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

export default {
    hubspotAuth,
    hubspotAuthCallback,
    hubspotAuthRefreshAccessToken,
    hubspotListContacts,
    hubspotCreateContacts,
    hubspotUpdateContacts,
    hubspotGetOwnersByEmail,
    hubspotGetContactsByEmail,
    hubspotGetContactsById,
    hubspotSearchContacts,
    hubspotDeleteContacts,
    hubspotListCompanies,
    hubspotCreateCompanies,
    hubspotUpdateCompanies,
    hubspotDeleteCompanies,
    hubspotListPipelines,
    hubspotGetPipeline,
    hubspotCreatePipelines,
    hubspotDeletePipelines,
    hubspotUpdatePipelines,
    hubspotCreateDeals,
    hubspotUpdateDeals,
    hubspotListDeals,
    hubspotListAnalyticsReports,
    hubspotListAnalyticsEvents,
    hubspotListAnalyticsViews,
    hubspotWebhook,
    hubspotListCustomObjects,
    hubspotCreateCustomObjects,
    hubspotUpdateCustomObjects,
    hubspotDeleteCustomObjects
};
