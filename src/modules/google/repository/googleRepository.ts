import { google, calendar_v3  } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const getGoogleCalendars = async (googleOauth2Client: OAuth2Client): Promise<calendar_v3.Schema$CalendarList>  => {
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleCalendar.calendarList.list();
    return data;
};

const googleCreateEvent = async (googleOauth2Client: OAuth2Client, body): Promise<calendar_v3.Schema$Events>  => {
    if (body.requestBody.location === 'physical') {
        body.requestBody.location = body.requestBody.conferenceData.createRequest.conferenceSolutionKey.type;
        delete body.requestBody.conferenceData;
    }

    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleCalendar.events.insert(body);
    return data;
};

const googleListEvents = async (googleOauth2Client: OAuth2Client, query): Promise<calendar_v3.Schema$Events>  => {
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleCalendar.events.list(query);
    return data;
};

const googleListEventByEventIdAndCalendar = async (googleOauth2Client: OAuth2Client, params): Promise<calendar_v3.Schema$Event>  => {
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleCalendar.events.get(params);
    return data;
};

const googleUpdateEvent = async (googleOauth2Client: OAuth2Client, body): Promise<calendar_v3.Schema$Events>  => {
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleCalendar.events.patch(body);
    return data;
};

const googleDeleteEvent = async (googleOauth2Client: OAuth2Client, params): Promise<void>  => {
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client });
    await googleCalendar.events.delete(params);
};

export default {
    getGoogleCalendars,
    googleCreateEvent,
    googleListEvents,
    googleUpdateEvent,
    googleDeleteEvent,
    googleListEventByEventIdAndCalendar,
};
