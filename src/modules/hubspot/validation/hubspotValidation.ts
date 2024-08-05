import Joi from 'joi';
import joiPhone from 'joi-phone-number';

const customJoi = Joi.extend(joiPhone);

const listHubspotSchema =  Joi.object({
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
  website: Joi.string().domain().required().messages({
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

export { listHubspotSchema, hubspotCreateContactSchema, hubspotUpdateContactSchema };