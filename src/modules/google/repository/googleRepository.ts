import { OAuth2Client } from 'google-auth-library';
import { google, calendar_v3, drive_v3, sheets_v4  } from 'googleapis';

const googleListCalendars = async (googleOauth2Client: OAuth2Client): Promise<calendar_v3.Schema$CalendarList>  => {
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

const googleListSpreadSheets = async (googleOauth2Client: OAuth2Client, query): Promise<drive_v3.Schema$FileList> => {
    const googleDrive = await google.drive({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleDrive.files.list({
        pageSize: query.pageSize,
        pageToken: query.nextPageToken,
        fields: 'nextPageToken, files(id, name, webViewLink)',
        q: 'mimeType=\'application/vnd.google-apps.spreadsheet\'',
    });
    return data;
};

const googleGetSpreadSheet = async (googleOauth2Client: OAuth2Client, fileId): Promise<drive_v3.Schema$File> => {
    const googleDrive = await google.drive({ version: 'v3', auth: googleOauth2Client });
    const { data } = await googleDrive.files.get({ fileId, fields: 'kind, id, name, mimeType, size, createdTime , modifiedTime, webViewLink, owners' });
    return data;
};

const googleAppendSpreadSheetData = async (googleOauth2Client: OAuth2Client, spreadsheetId, range, values): Promise<sheets_v4.Schema$AppendValuesResponse> => {
    const googleSheet = await google.sheets({ version: 'v4', auth: googleOauth2Client });
    const body = { spreadsheetId, range, valueInputOption: 'RAW', insertDataOption: 'INSERT_ROWS', resource: { values } };

    const { data } = await googleSheet.spreadsheets.values.append(body);
    return data;
};

const googleGetSpreadSheetData = async (googleOauth2Client: OAuth2Client, spreadsheetId, range): Promise<sheets_v4.Schema$ValueRange> => {
    const googleSheet = await google.sheets({ version: 'v4', auth: googleOauth2Client });
    const { data } = await googleSheet.spreadsheets.values.get({ spreadsheetId, range });
    return data;
};

const googleUpdateSpreadSheetData = async (googleOauth2Client: OAuth2Client, spreadsheetId, range, values): Promise<sheets_v4.Schema$UpdateValuesResponse> => {
    const googleSheet = await google.sheets({ version: 'v4', auth: googleOauth2Client });
    const body = { spreadsheetId, range, valueInputOption: 'RAW', requestBody: { values } };

    const { data } = await googleSheet.spreadsheets.values.update(body);
    return data;
};

const googleClearSpreadSheetData = async (googleOauth2Client: OAuth2Client, spreadsheetId, range) => {
    const googleSheet = await google.sheets({ version: 'v4', auth: googleOauth2Client });
    await googleSheet.spreadsheets.values.clear({ spreadsheetId, range });
};


export default {
    googleListCalendars,
    googleCreateEvent,
    googleListEvents,
    googleUpdateEvent,
    googleDeleteEvent,
    googleListEventByEventIdAndCalendar,
    googleListSpreadSheets,
    googleGetSpreadSheet,
    googleAppendSpreadSheetData,
    googleGetSpreadSheetData,
    googleUpdateSpreadSheetData,
    googleClearSpreadSheetData
};