import Joi from 'joi';

const codeSchema = Joi.object({
  code: Joi.string().required().messages({
    'any.required': 'code is required',
    'string.base': 'code must be a string',
    'string.empty': 'code is is not allowed to be empty',
  }),
  scope: Joi.string().messages({
    'any.required': 'scope is required',
    'string.base': 'scope must be a string',
    'string.empty': 'scope is is not allowed to be empty',
  }),
}).unknown(true);

const createEventSchema = Joi.object({
  calendarId: Joi.string().messages({
    'any.required': 'calendarId is required',
    'string.base': 'calendarId must be a string',
    'string.empty': 'calendarId is is not allowed to be empty',
  }),
  summary: Joi.string().required().messages({
    'any.required': 'summary is required and is event name',
    'string.base': 'summary must be a string and is event name',
    'date.empty': 'summary is not allowed to be empty and is event name',
  }),
  description: Joi.string().required().messages({
    'date.empty': 'description is not allowed to be empty',
    'any.required': 'description is required and is description of the event',
    'string.base': 'description must be a string and is description of the event',
  }),
  start: Joi.object().required().keys({
    dateTime: Joi.date().iso().required().messages({
      'any.required': 'dateTime is required',
      'date.empty': 'dateTime is not allowed to be empty',
      'date.base': 'dateTime must be a valid date, ex: 2020-01-01T10:00:00',
    }),
    timeZone: Joi.string().required().messages({
      'string.base': 'timeZone must be a string',
      'string.empty': 'timeZone is is not allowed to be empty',
      'any.required': 'timeZone is required, ex: America/Los_Angeles',
    }),
  }),
  end: Joi.object().required().keys({
    dateTime: Joi.date().iso().required().messages({
      'any.required': 'dateTime is required',
      'date.empty': 'dateTime is not allowed to be empty',
      'date.base': 'dateTime must be a valid date, ex: 2020-01-01T11:00:00',
    }),
    timeZone: Joi.string().required().messages({
      'string.base': 'timeZone must be a string',
      'string.empty': 'timeZone is is not allowed to be empty',
      'any.required': 'timeZone is required, ex: America/Los_Angeles',
    }),
  }),
  attendees: Joi.array().required().items(
    Joi.object().required().keys({
      email: Joi.string().email().required().messages({
        'any.required': 'email is required',
        'string.base': 'email must be a string',
        'string.email': 'email must be a valid email',
        'string.empty': 'email is not allowed to be empty',
      }),
    })
  ),
  creator: Joi.object().required().keys({
    self: Joi.boolean().default(true).required(),
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.base': 'email must be a string',
      'string.email': 'email must be a valid email',
      'string.empty': 'email is not allowed to be empty',
    }),
  }),
  organizer: Joi.object().required().keys({
    self: Joi.boolean().default(true).required(),
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.base': 'email must be a string',
      'string.email': 'email must be a valid email',
      'string.empty': 'email is not allowed to be empty',
    }),
    displayName: Joi.string().required().messages({
      'any.required': 'displayName is required',
      'string.base': 'displayName must be a string',
      'date.empty': 'displayName is not allowed to be empty',
    }),
  }),
  location: Joi.string().required().valid('virtual', 'physical').messages({
    'any.required': 'location is required',
    'string.base': 'location must be a string',
    'string.empty': 'location is not allowed to be empty',
    'any.only': 'location must be either virtual or physical',
  }),
  conferenceData: Joi.when('location', {
    is: 'virtual',
    then: Joi.object({
      createRequest: Joi.object({
        conferenceSolutionKey: Joi.object({
          type: Joi.string().required().valid('hangoutsMeet').messages({
            'string.base': 'type must be a string, ex: hangoutsMeet',
            'any.required': 'type is required, ex: hangoutsMeet',
            'any.only': 'type must be hangoutsMeet',
          }),
        }).required(),
      }).required(),
    }).required(),
    otherwise: Joi.object({
      createRequest: Joi.object({
        conferenceSolutionKey: Joi.object({
          type: Joi.string().required().invalid('hangoutsMeet').messages({
            'string.base': 'type must be a string, ex: 123 Main St, Anytown, USA',
            'any.required': 'type is required, ex: 123 Main St, Anytown, USA',
            'any.invalid': 'type cannot be hangoutsMeet for physical location',
          }),
        }).required(),
      }).required(),
    }).required(),
  }),
});

const listEventsSchema = Joi.object({
  calendarId: Joi.string().required().messages({
    'any.required': 'calendarId is required',
    'string.base': 'calendarId must be a string',
    'string.empty': 'calendarId is is not allowed to be empty',
  }),
  timeMin: Joi.date().iso().required().messages({
    'any.required': 'timeMin is required',
    'date.empty': 'timeMin is not allowed to be empty',
    'date.base': 'timeMin must be a valid date, ex: 2020-01-01T11:00:00',
  }),
  timeMax: Joi.date().iso().required().greater(Joi.ref('timeMin')).messages({
    'any.required': 'timeMax is required',
    'date.empty': 'timeMax is not allowed to be empty',
    'date.greater': 'timeMax must be greater than timeMin',
    'date.base': 'timeMax must be a valid date, ex: 2020-01-01T11:00:00',
  }),
  timeZone: Joi.string().messages({
    'string.base': 'timeZone must be a string',
    'string.empty': 'timeZone is is not allowed to be empty',
    'any.required': 'timeZone is required, ex: America/Los_Angeles',
  }),
});

const listSpreadSheetsSchema =  Joi.object({
  pageSize: Joi.string().required().messages({
    'any.required': 'pageSize is required',
    'string.base': 'pageSize must be a string',
    'string.empty': 'pageSize is is not allowed to be empty',
  }),
  nextPageToken: Joi.string().messages({
    'any.required': 'nextPageToken is required',
    'string.base': 'nextPageToken must be a string',
    'date.empty': 'nextPageToken is not allowed to be empty',
  }),
});

const spreadSheetHeaderSchema = Joi.array().items(Joi.string().required()).min(1).required().messages({
  'any.required': 'First array for headers is required ex: ["Name", "Email", "etc..."].',
  'array.base': 'First array must be an array of headers.',
  'array.min': 'First array of headers must contain at least one value ["Name"].',
  'string.base': 'Each header item must be a string.',
  'string.empty': 'First array for headers cannot be empty.'
});

const spreadSheetDataSchema = Joi.array().items(Joi.string().required()).min(1).required().messages({
  'any.required': 'Next arrays for data values is required ex: ["Joe", "email@yahoo.com", "etc..."].',
  'array.base': 'Next arrays must be an array of data values.',
  'array.min': 'Next arrays of data values must contain at least one value ["Jose"].',
  'string.empty': 'Next arrays for data values cannot be empty.'
});
    
const createSpreadSheetDataSchema = Joi.object({
  range: Joi.string().required().messages({
    'any.required': 'range is required ex: Sheet1!A1:D10',
    'string.base': 'range must be a string ex: Sheet1!A1:D10',
    'string.empty': 'range is is not allowed to be empty ex: Sheet1!A1:D10',
  }),
  values: Joi.array().items(spreadSheetHeaderSchema, spreadSheetDataSchema).min(2).required().messages({
    'array.base': 'The "values" must be an array of arrays.',
    'array.min': 'The "values" array must contain at least two arrays.',
    'any.required': 'The "values" field is required.',
    'array.includesRequiredUnknowns': 'The values array must contain at least one header array ex: ["Name", "Email", "etc..."]. followed by at least one data values array ex: ["Joe", "email@yahoo.com", "etc..."].',
  }),
});

const rangeSpreadSheetDataSchema =  Joi.object({
  range: Joi.string().required().messages({
    'any.required': 'range is required ex: Sheet1!A1:D10',
    'string.base': 'range must be a string ex: Sheet1!A1:D10',
    'string.empty': 'range is is not allowed to be empty ex: Sheet1!A1:D10',
  }),
});

const updateSpreadSheetDataSchema = Joi.object({
  range: Joi.string().required().messages({
    'any.required': 'range is required ex: Sheet1!A1:D10',
    'string.base': 'range must be a string ex: Sheet1!A1:D10',
    'string.empty': 'range is is not allowed to be empty ex: Sheet1!A1:D10',
  }),
  values: Joi.array().items().min(1).required().messages({
    'any.required': 'values field is required.',
    'array.base': 'values must be an array of arrays.',
    'array.min': 'values array must contain at least 1 array.'
  }),
});

export {
  codeSchema,
  createEventSchema,
  listEventsSchema,
  listSpreadSheetsSchema,
  createSpreadSheetDataSchema,
  rangeSpreadSheetDataSchema,
  updateSpreadSheetDataSchema
};