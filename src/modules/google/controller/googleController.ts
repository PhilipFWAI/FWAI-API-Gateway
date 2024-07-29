import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';
import { googleOauth2Client } from '../../../services/google';
import googleRepository from '../repository/googleRepository';
import { generateRandomString } from '../../../utils/jwtUtils';

const googleAuth = async (req, res) => {
    try {
      const scopes = JSON.parse(process.env.GOOGLE_SCOPES);
      const googleAuth = googleOauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
  
      return res.redirect(googleAuth);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleAuthCallback = async (req, res) => {
    try {
        const response = await googleOauth2Client.getToken(req.query.code);
        googleOauth2Client.setCredentials(response.res.data);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', { authGoogleCode: req.query.code, tokens: response.res.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleRefreshAccessToken = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ refresh_token: req.query.refreshToken });
        const response = await googleOauth2Client.refreshAccessToken();
        googleOauth2Client.setCredentials(response.res.data);
        
        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { tokens: response.res.data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleListCalendars = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        const calendars = await googleRepository.googleListCalendars(googleOauth2Client);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { calendars });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleCreateEvent = async (req, res) => {
    try {
        const reminders = {
            useDefault: false,
            overrides: [
                {method: 'email', minutes: Number(process.env.GOOGLE_EVENT_EMAIL_REMINDER)},
                {method: 'popup', minutes: Number(process.env.GOOGLE_EVENT_POPUP_REMINDER)},
            ],
        };

        req.body.reminders = reminders;
        req.body.conferenceData.createRequest.requestId = generateRandomString();
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        const event = await googleRepository.googleCreateEvent(googleOauth2Client, { calendarId: req.body.calendarId, conferenceDataVersion: 1, requestBody: req.body });

        responseUtils.handleSuccess(httpStatus.CREATED, 'Success.',  { event });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleListEvents = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        req.query.timeMin = new Date(req.query?.timeMin).toISOString();
        req.query.timeMax = new Date(req.query?.timeMax).toISOString();
        const events = await googleRepository.googleListEvents(googleOauth2Client, req.query);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { events });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleListEvent = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        const event = await googleRepository.googleListEventByEventIdAndCalendar(googleOauth2Client, req.params);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { event });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleUpdateEvent = async (req, res) => {
    try {
        if (req.body.location === 'physical') {
            req.body.location = req.body.conferenceData.createRequest.conferenceSolutionKey.type;
            delete req.body.conferenceData.createRequest.conferenceSolutionKey.type;
        }

        const eventId = req.params.eventId;
        const calendarId = req.params.calendarId;
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        const event = await googleRepository.googleUpdateEvent(googleOauth2Client, { eventId, calendarId, requestBody: req.body });

        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { event });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleDeleteEvent = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        await googleRepository.googleDeleteEvent(googleOauth2Client,  req.params);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.', {});
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleListSpreadSheets = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        const data = await googleRepository.googleListSpreadSheets(googleOauth2Client, req.query);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleGetSpreadSheet = async (req, res) => {
    try {
        googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
        const data = await googleRepository.googleGetSpreadSheet(googleOauth2Client, req.params.fileId);

        responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { data });
        return responseUtils.response(res);
    } catch (error) {
        responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const googleAppendSpreadSheetData = async (req, res) => {
try {
    googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
    const created = await googleRepository.googleAppendSpreadSheetData(googleOauth2Client, req.params.fileId, req.body.range, req.body.values);
    const createdData = await googleRepository.googleGetSpreadSheetData(googleOauth2Client, req.params.fileId, req.body.range);

    responseUtils.handleSuccess(httpStatus.CREATED, 'Success.',  { created,  createdData });
    return responseUtils.response(res);
} catch (error) {
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
    return responseUtils.response(res);
}
};

const googleGetSpreadSheetData = async (req, res) => {
try {
    googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
    const data = await googleRepository.googleGetSpreadSheetData(googleOauth2Client, req.params.fileId, req.query.range);

    responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { data });
    return responseUtils.response(res);
} catch (error) {
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
    return responseUtils.response(res);
}
};

const googleUpdateSpreadSheetData = async (req, res) => {
try {
    googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
    const updated = await googleRepository.googleUpdateSpreadSheetData(googleOauth2Client, req.params.fileId, req.body.range, req.body.values);
    const updatedData = await googleRepository.googleGetSpreadSheetData(googleOauth2Client, req.params.fileId, req.body.range);

    responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { updated, updatedData });
    return responseUtils.response(res);
} catch (error) {
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
    return responseUtils.response(res);
}
};

const googleClearSpreadSheetData = async (req, res) => {
try {
    googleOauth2Client.setCredentials({ access_token: req.header('Authorization').replace('Bearer ', '') });
    const clearedData = await googleRepository.googleGetSpreadSheetData(googleOauth2Client, req.params.fileId, req.query.range);
    const data = await googleRepository.googleClearSpreadSheetData(googleOauth2Client, req.params.fileId, req.query.range);

    responseUtils.handleSuccess(httpStatus.OK, 'Success.',  { data, clearedData });
    return responseUtils.response(res);
} catch (error) {
    responseUtils.handleError(error.status || httpStatus.INTERNAL_SERVER_ERROR, error.toString());
    return responseUtils.response(res);
}
};

export default {
    googleAuth,
    googleAuthCallback,
    googleRefreshAccessToken,
    googleListCalendars,
    googleCreateEvent,
    googleListEvents,
    googleListEvent,
    googleUpdateEvent,
    googleDeleteEvent,
    googleListSpreadSheets,
    googleGetSpreadSheet,
    googleAppendSpreadSheetData,
    googleGetSpreadSheetData,
    googleUpdateSpreadSheetData,
    googleClearSpreadSheetData
};