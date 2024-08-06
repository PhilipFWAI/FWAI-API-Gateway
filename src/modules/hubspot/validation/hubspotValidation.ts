import Joi from 'joi';
import joiPhone from 'joi-phone-number';

const customJoi = Joi.extend(joiPhone);

const hubspotListSchema =  Joi.object({
  limit: Joi.string().required().messages({
    'any.required': 'limit is required',
    'string.base': 'limit must be a string',
    'string.empty': 'limit is is not allowed to be empty',
  }),
  after: Joi.string().messages({
    'any.required': 'after is required. And this represent next page',
    'string.base': 'after must be a string. And this represent next page',
    'date.empty': 'after is not allowed to be empty. And this represent next page',
  }),
});

const hubspotCreateContactSchema =  Joi.object({
  firstname: Joi.string().required().messages({
    'any.required': 'firstname is required',
    'string.base': 'firstname must be a string',
    'string.empty': 'firstname is is not allowed to be empty',
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'lastname is required',
    'string.base': 'lastname must be a string',
    'string.empty': 'lastname is is not allowed to be empty',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email should be a type of string',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
  }),
  phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
    'any.required': 'phone is required',
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone did not seem to be a phone number',
  }),
  company: Joi.string().required().messages({
    'any.required': 'company is required',
    'string.base': 'company must be a string',
    'string.empty': 'company is is not allowed to be empty',
  }),
  website: Joi.string().domain().messages({
    'any.required': 'website is required',
    'string.base': 'website must be a string',
    'string.empty': 'website is is not allowed to be empty',
  }),
  lifecyclestage: Joi.string().valid('subscriber', 'marketingqualifiedlead').messages({
    'any.required': 'lifecyclestage is required',
    'string.base': 'lifecyclestage must be a string',
    'string.empty': 'lifecyclestage is is not allowed to be empty',
  }),
  jobtitle: Joi.string().messages({
    'any.required': 'jobtitle is required',
    'string.base': 'jobtitle must be a string',
    'string.empty': 'jobtitle is is not allowed to be empty',
  }),
});

const hubspotUpdateContactSchema =  Joi.object({
  firstname: Joi.string().messages({
    'any.required': 'firstname is required',
    'string.base': 'firstname must be a string',
    'string.empty': 'firstname is is not allowed to be empty',
  }),
  lastname: Joi.string().messages({
    'any.required': 'lastname is required',
    'string.base': 'lastname must be a string',
    'string.empty': 'lastname is is not allowed to be empty',
  }),
  email: Joi.string().email().messages({
    'string.base': 'email should be a type of string',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
  }),
  phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).messages({
    'any.required': 'phone is required',
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone did not seem to be a phone number',
  }),
  company: Joi.string().messages({
    'any.required': 'company is required',
    'string.base': 'company must be a string',
    'string.empty': 'company is is not allowed to be empty',
  }),
  website: Joi.string().domain().messages({
    'any.required': 'website is required',
    'string.base': 'website must be a string',
    'string.empty': 'website is is not allowed to be empty',
  }),
  lifecyclestage: Joi.string().valid('subscriber', 'marketingqualifiedlead').messages({
    'any.required': 'lifecyclestage is required',
    'string.base': 'lifecyclestage must be a string',
    'string.empty': 'lifecyclestage is is not allowed to be empty',
  }),
  jobtitle: Joi.string().messages({
    'any.required': 'jobtitle is required',
    'string.base': 'jobtitle must be a string',
    'string.empty': 'jobtitle is is not allowed to be empty',
  }),
});

const hubspotCreateDealsPipelineStagesSchema =  Joi.object({
  label: Joi.string().required().messages({
    'any.required': 'label is required. And is pipeline name',
    'string.base': 'label must be a string. And is pipeline name',
    'string.empty': 'label is is not allowed to be empty. And is pipeline name',
  }),
  displayOrder: Joi.number().integer().required().messages({
    'any.required': 'displayOrder is required.',
    'string.base': 'displayOrder must be a number.',
    'date.empty': 'displayOrder is not allowed to be empty.',
  }),
  stages: Joi.array().min(2).required().items(
    Joi.object().keys({
      label: Joi.string().required().messages({
        'any.required': 'label is required. And is stage name',
        'string.base': 'label must be a string. And is stage name',
        'string.empty': 'label is is not allowed to be empty. And is stage name',
      }),
      displayOrder: Joi.number().integer().min(1).max(10).required().messages({
        'any.required': 'displayOrder is required.',
        'string.base': 'displayOrder must be a number.',
        'date.empty': 'displayOrder is not allowed to be empty.',
      }),
      metadata: Joi.object().required().keys({
        ticketState: Joi.string().valid('OPEN', 'CLOSED').messages({
          'any.required': 'ticketState is required',
          'string.base': 'ticketState must be a string',
          'string.empty': 'ticketState is is not allowed to be empty',
        }),
        probability: Joi.number().min(0.0).max(1.0).required().messages({
          'any.required': 'probability is required.',
          'string.base': 'probability must be a number.',
          'number.min': 'probability must be at least 0.0.',
          'number.max': 'probability must be at most 1.0.',
          'date.empty': 'probability is not allowed to be empty.',
        })
      })
    })
  ),
});

const hubspotUpdateDealsPipelineSchema =  Joi.object({
  label: Joi.string().required().messages({
    'any.required': 'label is required. And is pipeline name',
    'string.base': 'label must be a string. And is pipeline name',
    'string.empty': 'label is is not allowed to be empty. And is pipeline name',
  }),
  displayOrder: Joi.number().integer().required().messages({
    'any.required': 'displayOrder is required.',
    'string.base': 'displayOrder must be a number.',
    'date.empty': 'displayOrder is not allowed to be empty.',
  }),
});

const hubspotCreateDealsSchema =  Joi.object({
  dealname: Joi.string().required().messages({
    'any.required': 'dealname is required. And is pipeline name',
    'string.base': 'dealname must be a string. And is pipeline name',
    'string.empty': 'dealname is is not allowed to be empty. And is pipeline name',
  }),
  dealstage: Joi.string().required().messages({
    'any.required': 'dealstage is required.',
    'string.base': 'dealstage must be a string.',
    'date.empty': 'dealstage is not allowed to be empty.',
  }),
  pipeline: Joi.string().required().messages({
    'any.required': 'pipeline is required.',
    'string.base': 'pipeline must be a string.',
    'date.empty': 'pipeline is not allowed to be empty.',
  }),
  amount: Joi.number().required().messages({
    'any.required': 'amount is required.',
    'string.base': 'amount must be a string.',
    'date.empty': 'amount is not allowed to be empty.',
  }),
  hubspot_owner_id: Joi.number().integer().required().messages({
    'any.required': 'hubspot_owner_id is required.',
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  closedate: Joi.date().required().messages({
    'any.required': 'closedate is required.',
    'date.base': 'closedate must be a valid date',
    'date.empty': 'closedate is not allowed to be empty.',
  }),
  dealtype: Joi.string().valid('newbusiness', 'existingbusiness').messages({
    'any.required': 'dealtype is required.',
    'string.base': 'dealtype must be a string.',
    'date.empty': 'dealtype is not allowed to be empty.',
  }),
});

const hubspotUpdateDealsSchema =  Joi.object({
  dealname: Joi.string().messages({
    'any.required': 'dealname is required. And is pipeline name',
    'string.base': 'dealname must be a string. And is pipeline name',
    'string.empty': 'dealname is is not allowed to be empty. And is pipeline name',
  }),
  dealstage: Joi.string().messages({
    'any.required': 'dealstage is required.',
    'string.base': 'dealstage must be a string.',
    'date.empty': 'dealstage is not allowed to be empty.',
  }),
  pipeline: Joi.string().messages({
    'any.required': 'pipeline is required.',
    'string.base': 'pipeline must be a string.',
    'date.empty': 'pipeline is not allowed to be empty.',
  }),
  amount: Joi.number().messages({
    'any.required': 'amount is required.',
    'string.base': 'amount must be a string.',
    'date.empty': 'amount is not allowed to be empty.',
  }),
  hubspot_owner_id: Joi.number().integer().messages({
    'any.required': 'hubspot_owner_id is required.',
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  closedate: Joi.date().messages({
    'any.required': 'closedate is required.',
    'date.base': 'closedate must be a valid date',
    'date.empty': 'closedate is not allowed to be empty.',
  }),
  dealtype: Joi.string().valid('newbusiness', 'existingbusiness').messages({
    'any.required': 'dealtype is required.',
    'string.base': 'dealtype must be a string.',
    'date.empty': 'dealtype is not allowed to be empty.',
  }),
});

export {
  hubspotListSchema,
  hubspotCreateContactSchema,
  hubspotUpdateContactSchema,
  hubspotCreateDealsPipelineStagesSchema,
  hubspotUpdateDealsPipelineSchema,
  hubspotCreateDealsSchema,
  hubspotUpdateDealsSchema
};