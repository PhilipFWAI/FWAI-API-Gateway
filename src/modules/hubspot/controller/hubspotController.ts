import axios from 'axios';
import httpStatus from 'http-status';
import { URLSearchParams } from 'url';
import responseUtils from '../../../utils/responseUtils';
import hubspotRepository from '../repository/hubspotRepository';
import { HUBSPOT_ANALYTICS, HUBSPOT_COMPANIES, HUBSPOT_CONTACTS, HUBSPOT_CUSTOM_OBJECTS, HUBSPOT_DEALS, HUBSPOT_OWNERS, HUBSPOT_PIPELINES } from '../../../utils/hubspotUtils';
import { hubspotCreateCompanySchema, hubspotCreateContactSchema, hubspotCreateCustomObjectsSchema, hubspotCreateDealsSchema, hubspotCreatePipelineSchema, hubspotUpdateCompanySchema, hubspotUpdateContactSchema, hubspotUpdateCustomObjectsSchema, hubspotUpdatePipelineSchema, hubspotUpdateDealsSchema } from '../validation/hubspotValidation';


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

const hubspotGetOwnersByAttribute = async (req, res, auth) => {
    try {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const isEmailAddress: boolean = emailRegex.test(req.params?.attribute);
        
        const response = await axios.get(`${HUBSPOT_OWNERS}/${isEmailAddress ? '?email=' : ''}${req.params.attribute}`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListOwners = async (req, res, auth) => {
    try {
        const response = await axios.get(HUBSPOT_OWNERS, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { companies: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListCustomObjects = async (req, res, auth) => {
    try {
        const response = await axios.get(HUBSPOT_CUSTOM_OBJECTS, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { customObjects: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetContactsByAttribute = async (req, res, auth) => {
    try {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const isEmailAddress: boolean = emailRegex.test(req.params?.attribute);

        const response = await axios.get(`${HUBSPOT_CONTACTS}/${req.params.attribute}${isEmailAddress ? '?idProperty=email': '' }`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListContacts = async (req, res, auth) => {
    try {
        if (req.body.filterGroups) {
            const response = await axios.post(`${HUBSPOT_CONTACTS}/search`, req.body, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
            responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
            return responseUtils.response(res);
        }

        const response = await axios.get(HUBSPOT_CONTACTS, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListCompanies = async (req, res, auth) => {
    try {
        const response = await axios.get(HUBSPOT_COMPANIES, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { companies: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListPipelines = async (req, res, auth) => {
    try {
        const response = await axios.get(`${HUBSPOT_PIPELINES}/deals`, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelines: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetPipelinesByAttribute = async (req, res, auth) => {
    try {
        const response = await axios.get(`${HUBSPOT_PIPELINES}/deals/${req.params.pipelineId}/stages`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListDeals = async (req, res, auth) => {
    try {
        const response = await axios.get(HUBSPOT_DEALS, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListAnalyticsReports = async (req, res, auth) => {
    try {
        const response = await axios.get(`${HUBSPOT_ANALYTICS}/v1/reports/data`, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListAnalyticsEvents = async (req, res, auth) => {
    try {
        const response = await axios.get(`${HUBSPOT_ANALYTICS}/v1/events`, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotListAnalyticsViews = async (req, res, auth) => {
    try {
        const response = await axios.get(`${HUBSPOT_ANALYTICS}/v1/views`, { params: req.query, headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contacts: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateCustomObjects = async (req, res, auth) => {
    try {
        const response = await axios.post(HUBSPOT_CUSTOM_OBJECTS, { properties: req.body}, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { customObject: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateContacts = async (req, res, auth) => {
    try {
        const response = await axios.post(HUBSPOT_CONTACTS, { properties: req.body}, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateCompanies = async (req, res, auth) => {
    try {
        const response = await axios.post(HUBSPOT_COMPANIES, { properties: req.body}, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { company: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreatePipelines = async (req, res, auth) => {
    try {
       const response = await axios.post(`${HUBSPOT_PIPELINES}/deals`, req.body, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotCreateDeals = async (req, res, auth) => {
    try {
        req.body.closedate = new Date(req.body.closedate).toISOString();
        const response = await axios.post(`${HUBSPOT_DEALS}`, { properties: req.body }, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { deal: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateCustomObjects = async (req, res, auth) => {
    try {
        const response = await axios.patch(`${HUBSPOT_CUSTOM_OBJECTS}/${req.params.id}`, { properties: req.body}, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { customObject: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateContacts = async (req, res, auth) => {
    try {
        const response = await axios.patch(`${HUBSPOT_CONTACTS}/${req.params.id}`, { properties: req.body}, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { contact: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateCompanies = async (req, res, auth) => {
    try {
        const response = await axios.patch(`${HUBSPOT_COMPANIES}/${req.params.id}`, { properties: req.body}, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' }});
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { company: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdatePipelines = async (req, res, auth) => {
    try {
        const response = await axios.patch(`${HUBSPOT_PIPELINES}/deals/${req.params.id}`, req.body, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { pipelinesStages: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateDeals = async (req, res, auth) => {
    try {
        req.body?.closedate && (req.body.closedate = new Date(req.body.closedate).toISOString());
        const response = await axios.patch(`${HUBSPOT_DEALS}/${req.params.id}`, { properties: req.body }, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { deal: response.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteCustomObjects = async (req, res, auth) => {
    try {
        await axios.delete(`${HUBSPOT_CUSTOM_OBJECTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteContacts = async (req, res, auth) => {
    try {
        await axios.delete(`${HUBSPOT_CONTACTS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteCompanies = async (req, res, auth) => {
    try {
        await axios.delete(`${HUBSPOT_COMPANIES}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeletePipelines = async (req, res, auth) => {
    try {
        await axios.delete(`${HUBSPOT_PIPELINES}/deals/${req.params.id}`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteDeals = async (req, res, auth) => {
    try {
        await axios.delete(`${HUBSPOT_DEALS}/${req.params.id}`, { headers: { 'Authorization': `Bearer ${auth.data.access_token}`, 'Content-Type': 'application/json' } });
        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotGetHandler = async (req, res) => {
    try {
        const { object, attribute } = req.params;
        const auth = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);

        if (!req.params || !object) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Please specify param object to access');
            return responseUtils.response(res);
        }

        switch (object) {
            case 'owners':
                if (attribute) return await hubspotGetOwnersByAttribute(req, res, auth);
                return await hubspotListOwners(req, res, auth);
            case 'custom-objects':
                return await hubspotListCustomObjects(req, res, auth);
            case 'contacts':
                if (attribute) return await hubspotGetContactsByAttribute(req, res, auth);
                return await hubspotListContacts(req, res, auth);
            case 'companies':
                return await hubspotListCompanies(req, res, auth);
            case 'pipelines':
                if (attribute) return await hubspotGetPipelinesByAttribute(req, res, auth);
                return await hubspotListPipelines(req, res, auth);
            case 'deals':
                return await hubspotListDeals(req, res, auth);
            case 'analytics-reports':
                return await hubspotListAnalyticsReports(req, res, auth);
            case 'analytics-events':
                return await hubspotListAnalyticsEvents(req, res, auth);
            case 'analytics-views':
                return await hubspotListAnalyticsViews(req, res, auth);
            default:
                responseUtils.handleError(httpStatus.NOT_FOUND, 'Object specified not found');
                return responseUtils.response(res);
        }
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotPostHandler = async (req, res) => {
    try {
        let result;
        const { object } = req.params;
        const auth = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);

        if (!req.params || !object) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Please specify param object to access');
            return responseUtils.response(res);
        }

        switch (object) {
            case 'custom-objects':
                result = hubspotCreateCustomObjectsSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }

                return await hubspotCreateCustomObjects(req, res, auth);
            case 'contacts':
                result = hubspotCreateContactSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }

                return await hubspotCreateContacts(req, res, auth);
            case 'companies':
                result = hubspotCreateCompanySchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }
                
                return await hubspotCreateCompanies(req, res, auth);
            case 'pipelines':
                result = hubspotCreatePipelineSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }

                return await hubspotCreatePipelines(req, res, auth);
            case 'deals':
                result = hubspotCreateDealsSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }
                
                return await hubspotCreateDeals(req, res, auth);
            default:
                responseUtils.handleError(httpStatus.NOT_FOUND, 'Object specified not found');
                return responseUtils.response(res);
        }

    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotUpdateHandler = async (req, res) => {
    try {
        let result;
        const { object, id } = req.params;
        const auth = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);

        if (!req.params || !object) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Please specify param object to access');
            return responseUtils.response(res);
        }

        if (!id) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Please specify param object ID to update');
            return responseUtils.response(res);
        }

        switch (object) {
            case 'custom-objects':
                result = hubspotUpdateCustomObjectsSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }

                return await hubspotUpdateCustomObjects(req, res, auth);
            case 'contacts':
                result = hubspotUpdateContactSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }

                return await hubspotUpdateContacts(req, res, auth);
            case 'companies':
                result = hubspotUpdateCompanySchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }
                
                return await hubspotUpdateCompanies(req, res, auth);
            case 'pipelines':
                result = hubspotUpdatePipelineSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }

                return await hubspotUpdatePipelines(req, res, auth);
            case 'deals':
                result = hubspotUpdateDealsSchema.validate(req.body, { abortEarly: false });
                if (result?.error) {
                    const errorMessage = `${result?.error.details[0].message} in the body.`;
                    responseUtils.handleError(httpStatus.BAD_REQUEST, errorMessage);
                    return responseUtils.response(res);
                }
                
                return await hubspotUpdateDeals(req, res, auth);
            default:
                responseUtils.handleError(httpStatus.NOT_FOUND, 'Object specified not found');
                return responseUtils.response(res);
        }

    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

const hubspotDeleteHandler = async (req, res) => {
    try {
        const { object, id } = req.params;
        const auth = await hubspotRepository.handleHubspotAuth({ grant_type: 'refresh_token', refresh_token: req.authPlatform.refresh_token }, req.user.id);

        if (!req.params || !object) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Please specify param object to access');
            return responseUtils.response(res);
        }

        if (!id) {
            responseUtils.handleError(httpStatus.BAD_REQUEST, 'Please specify param object ID to delete');
            return responseUtils.response(res);
        }

        switch (object) {
            case 'custom-objects':
                return await hubspotDeleteCustomObjects(req, res, auth);
            case 'contacts':
                return await hubspotDeleteContacts(req, res, auth);
            case 'companies':
                return await hubspotDeleteCompanies(req, res, auth);
            case 'pipelines':
                return await hubspotDeletePipelines(req, res, auth);
            case 'deals':
                return await hubspotDeleteDeals(req, res, auth);
            default:
                responseUtils.handleError(httpStatus.NOT_FOUND, 'Object specified not found');
                return responseUtils.response(res);
        }
    } catch (error) {
        responseUtils.handleError(error.response.status || httpStatus.INTERNAL_SERVER_ERROR, error.response.data.message || error.response.statusText || error.toString());
        return responseUtils.response(res);
    }
};

export default {
    hubspotAuth,
    hubspotAuthCallback,
    hubspotAuthRefreshAccessToken,

    hubspotGetHandler,
    hubspotPostHandler,
    hubspotUpdateHandler,
    hubspotDeleteHandler,
    
    hubspotCreateCustomObjects,
    hubspotUpdateCustomObjects,
    hubspotDeleteCustomObjects,

    hubspotCreateContacts,
    hubspotUpdateContacts,
    hubspotGetOwnersByAttribute,
    hubspotGetContactsByAttribute,
    hubspotDeleteContacts,

    hubspotCreateCompanies,
    hubspotUpdateCompanies,
    hubspotDeleteCompanies,

    hubspotGetPipelinesByAttribute,
    hubspotCreatePipelines,
    hubspotDeletePipelines,
    hubspotUpdatePipelines,
    hubspotCreateDeals,
    hubspotUpdateDeals,

    hubspotWebhook,
};
