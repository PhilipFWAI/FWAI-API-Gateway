import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import { validCountries, validIndustries } from './hubspotValidList';

const JoiPhone = Joi.extend(joiPhone);

const hubspotListSchema =  Joi.object({
  limit: Joi.string().required().messages({
    'any.required': 'limit is required',
    'string.base': 'limit must be a string',
    'string.empty': 'limit is not allowed to be empty',
  }),
  after: Joi.string().messages({
    'any.required': 'after is required. And this represent next page',
    'string.base': 'after must be a string. And this represent next page',
    'date.empty': 'after is not allowed to be empty. And this represent next page',
  }),
});

const hubspotCreateContactSchema =  Joi.object({
  hubspot_owner_id: Joi.number().integer().messages({
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  firstname: Joi.string().required().messages({
    'any.required': 'firstname is required',
    'string.base': 'firstname must be a string',
    'string.empty': 'firstname is not allowed to be empty',
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'lastname is required',
    'string.base': 'lastname must be a string',
    'string.empty': 'lastname is not allowed to be empty',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email should be a type of string',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
  }),
  phone: JoiPhone.string().phoneNumber({ format: 'international', strict: true }).required().messages({
    'any.required': 'phone is required',
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone did not seem to be a phone number',
  }),
  company: Joi.string().required().messages({
    'any.required': 'company is required',
    'string.base': 'company must be a string',
    'string.empty': 'company is not allowed to be empty',
  }),
  country: Joi.string().valid(...validCountries).required().messages({
    'any.required': 'country is required',
    'string.base': 'country must be a string',
    'string.empty': 'country is not allowed to be empty',
  }),
  address: Joi.string().messages({
    'any.required': 'address is required',
    'string.base': 'address must be a string',
    'string.empty': 'address is not allowed to be empty',
  }),
  city: Joi.string().messages({
    'any.required': 'city is required',
    'string.base': 'city must be a string',
    'string.empty': 'city is not allowed to be empty',
  }),
  state: Joi.string().messages({
    'any.required': 'state is required',
    'string.base': 'state must be a string',
    'string.empty': 'state is not allowed to be empty',
  }),
  zip: Joi.string().messages({
    'any.required': 'zip is required',
    'string.base': 'zip must be a string',
    'string.empty': 'zip is not allowed to be empty',
  }),
  website: Joi.string().domain().messages({
    'any.required': 'website is required',
    'string.base': 'website must be a string',
    'string.empty': 'website is not allowed to be empty',
  }),
  lifecyclestage: Joi.string().valid('subscriber', 'marketingqualifiedlead').messages({
    'any.required': 'lifecyclestage is required',
    'string.base': 'lifecyclestage must be a string',
    'string.empty': 'lifecyclestage is not allowed to be empty',
  }),
  jobtitle: Joi.string().messages({
    'any.required': 'jobtitle is required',
    'string.base': 'jobtitle must be a string',
    'string.empty': 'jobtitle is not allowed to be empty',
  }),
});

const hubspotUpdateContactSchema =  Joi.object({
  hubspot_owner_id: Joi.number().integer().messages({
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  firstname: Joi.string().messages({
    'any.required': 'firstname is required',
    'string.base': 'firstname must be a string',
    'string.empty': 'firstname is not allowed to be empty',
  }),
  lastname: Joi.string().messages({
    'any.required': 'lastname is required',
    'string.base': 'lastname must be a string',
    'string.empty': 'lastname is not allowed to be empty',
  }),
  email: Joi.string().email().messages({
    'string.base': 'email should be a type of string',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
  }),
  phone: JoiPhone.string().phoneNumber({ format: 'international', strict: true }).messages({
    'any.required': 'phone is required',
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone did not seem to be a phone number',
  }),
  company: Joi.number().integer().messages({
    'any.required': 'company is required',
    'string.base': 'company must be a number',
    'string.empty': 'company is not allowed to be empty',
  }),
  country: Joi.string().valid(...validCountries).messages({
    'string.base': 'country must be a string',
    'string.empty': 'country is not allowed to be empty',
  }),
  address: Joi.string().messages({
    'any.required': 'address is required',
    'string.base': 'address must be a string',
    'string.empty': 'address is not allowed to be empty',
  }),
  city: Joi.string().messages({
    'any.required': 'city is required',
    'string.base': 'city must be a string',
    'string.empty': 'city is not allowed to be empty',
  }),
  state: Joi.string().messages({
    'any.required': 'state is required',
    'string.base': 'state must be a string',
    'string.empty': 'state is not allowed to be empty',
  }),
  zip: Joi.string().messages({
    'any.required': 'zip is required',
    'string.base': 'zip must be a string',
    'string.empty': 'zip is not allowed to be empty',
  }),
  website: Joi.string().domain().messages({
    'any.required': 'website is required',
    'string.base': 'website must be a string',
    'string.empty': 'website is not allowed to be empty',
  }),
  lifecyclestage: Joi.string().valid('subscriber', 'marketingqualifiedlead').messages({
    'any.required': 'lifecyclestage is required',
    'string.base': 'lifecyclestage must be a string',
    'string.empty': 'lifecyclestage is not allowed to be empty',
  }),
  jobtitle: Joi.string().messages({
    'any.required': 'jobtitle is required',
    'string.base': 'jobtitle must be a string',
    'string.empty': 'jobtitle is not allowed to be empty',
  }),
});

const hubspotCreatePipelineSchema =  Joi.object({
  label: Joi.string().required().messages({
    'any.required': 'label is required. And is pipeline name',
    'string.base': 'label must be a string. And is pipeline name',
    'string.empty': 'label is not allowed to be empty. And is pipeline name',
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
        'string.empty': 'label is not allowed to be empty. And is stage name',
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
          'string.empty': 'ticketState is not allowed to be empty',
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
  label: Joi.string().messages({
    'any.required': 'label is required. And is pipeline name',
    'string.base': 'label must be a string. And is pipeline name',
    'string.empty': 'label is not allowed to be empty. And is pipeline name',
  }),
  displayOrder: Joi.number().integer().messages({
    'any.required': 'displayOrder is required.',
    'string.base': 'displayOrder must be a number.',
    'date.empty': 'displayOrder is not allowed to be empty.',
  }),
});

const hubspotCreateDealsSchema =  Joi.object({
  hubspot_owner_id: Joi.number().integer().required().messages({
    'any.required': 'hubspot_owner_id is required.',
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  dealname: Joi.string().required().messages({
    'any.required': 'dealname is required. And is pipeline name',
    'string.base': 'dealname must be a string. And is pipeline name',
    'string.empty': 'dealname is not allowed to be empty. And is pipeline name',
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
  hubspot_owner_id: Joi.number().integer().messages({
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  dealname: Joi.string().messages({
    'any.required': 'dealname is required. And is pipeline name',
    'string.base': 'dealname must be a string. And is pipeline name',
    'string.empty': 'dealname is not allowed to be empty. And is pipeline name',
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

const hubspotSearchContactsSchema = Joi.object({
  filterGroups: Joi.array().items(
    Joi.object({
        filters: Joi.array().items(
            Joi.object({
                propertyName: Joi.string().messages({
                  'any.required': 'propertyName is required',
                  'string.base': 'propertyName must be a string',
                  'string.empty': 'propertyName is not allowed to be empty',
                }),
                value: Joi.string().messages({
                  'any.required': 'value is required',
                  'string.base': 'value must be a string',
                  'string.empty': 'value is not allowed to be empty',
                }),
                operator: Joi.string().valid('LT', 'LTE', 'GT', 'GTE', 'EQ', 'NEQ', 'BETWEEN', 'IN', 'NOT_IN', 'HAS_PROPERTY', 'NOT_HAS_PROPERTY', 'CONTAINS_TOKEN', 'NOT_CONTAINS_TOKEN').required(),
            }).required()
        ).required()
    }).required()
  )
});

const hubspotCreateCompanySchema =  Joi.object({
  hubspot_owner_id: Joi.number().integer().required().messages({
    'any.required': 'hubspot_owner_id is required.',
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  name: Joi.string().required().messages({
    'any.required': 'name is required',
    'string.base': 'name must be a string',
    'string.empty': 'name is not allowed to be empty',
  }),
  phone: JoiPhone.string().phoneNumber({ format: 'international', strict: true }).required().messages({
    'any.required': 'phone is required',
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone did not seem to be a phone number',
  }),
  domain: Joi.string().domain().required().messages({
    'any.required': 'domain is required',
    'string.base': 'domain must be a string',
    'string.empty': 'domain is not allowed to be empty',
  }),
  industry: Joi.string().valid(...validIndustries).required().messages({
    'any.required': 'industry is required',
    'string.base': 'industry must be a string',
    'string.empty': 'industry is not allowed to be empty',
  }),
  country: Joi.string().valid(...validCountries).required().messages({
    'any.required': 'country is required',
    'string.base': 'country must be a string',
    'string.empty': 'country is not allowed to be empty',
  }),
  city: Joi.string().required().messages({
    'any.required': 'city is required',
    'string.base': 'city must be a string',
    'string.empty': 'city is not allowed to be empty',
  }),
  state: Joi.string().required().messages({
    'any.required': 'state is required',
    'string.base': 'state must be a string',
    'string.empty': 'state is not allowed to be empty',
  }),
  zip: Joi.string().messages({
    'any.required': 'zip is required',
    'string.base': 'zip must be a string',
    'string.empty': 'zip is not allowed to be empty',
  }),
  lifecyclestage: Joi.string().messages({
    'any.required': 'lifecyclestage is required',
    'string.base': 'lifecyclestage must be a string',
    'string.empty': 'lifecyclestage is not allowed to be empty',
  }),
});

const hubspotUpdateCompanySchema =  Joi.object({
  hubspot_owner_id: Joi.number().integer().messages({
    'string.base': 'hubspot_owner_id must be a string.',
    'date.empty': 'hubspot_owner_id is not allowed to be empty.',
  }),
  name: Joi.string().messages({
    'string.base': 'name must be a string',
    'string.empty': 'name is not allowed to be empty',
  }),
  phone: JoiPhone.string().phoneNumber({ format: 'international', strict: true }).messages({
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone did not seem to be a phone number',
  }),
  domain: Joi.string().domain().messages({
    'string.base': 'domain must be a string',
    'string.empty': 'domain is not allowed to be empty',
  }),
  industry: Joi.string().valid(...validIndustries).messages({
    'string.base': 'industry must be a string',
    'string.empty': 'industry is not allowed to be empty',
  }),
  country: Joi.string().valid(...validCountries).messages({
    'string.base': 'country must be a string',
    'string.empty': 'country is not allowed to be empty',
  }),
  city: Joi.string().messages({
    'string.base': 'city must be a string',
    'string.empty': 'city is not allowed to be empty',
  }),
  state: Joi.string().messages({
    'string.base': 'state must be a string',
    'string.empty': 'state is not allowed to be empty',
  }),
  zip: Joi.string().messages({
    'any.required': 'zip is required',
    'string.base': 'zip must be a string',
    'string.empty': 'zip is not allowed to be empty',
  }),
  lifecyclestage: Joi.string().messages({
    'string.base': 'lifecyclestage must be a string',
    'string.empty': 'lifecyclestage is not allowed to be empty',
  }),
});

const hubspotCreateCustomObjectsSchema = Joi.object({
  associatedObjects: Joi.array().items(Joi.string().valid('CONTACT', 'COMPANY', 'DEAL')).messages({
    'array.base': 'associatedObjects must be an array',
    'string.base': 'Each item in associatedObjects must be a string',
  }),
  name: Joi.string().required().messages({
    'any.required': 'name is required',
    'string.base': 'name must be a string',
    'string.empty': 'name is not allowed to be empty',
  }),
  description: Joi.string().required().messages({
    'any.required': 'description is required',
    'string.base': 'description must be a string',
    'string.empty': 'description is not allowed to be empty',
  }),
  labels: Joi.object().required().keys({
    singular: Joi.string().required().messages({
      'any.required': 'singular is required',
      'string.base': 'singular must be a string',
      'string.empty': 'singular is not allowed to be empty',
    }),
    plural: Joi.string().required().messages({
      'any.required': 'plural is required',
      'string.base': 'plural must be a string',
      'string.empty': 'plural is not allowed to be empty',
    }),
  }),
  primaryDisplayProperty: Joi.string().required().messages({
    'any.required': 'primaryDisplayProperty is required',
    'string.base': 'primaryDisplayProperty must be a string',
    'string.empty': 'primaryDisplayProperty is not allowed to be empty',
  }),
  secondaryDisplayProperties: Joi.array().min(1).items(Joi.string()).required().messages({
    'any.required': 'secondaryDisplayProperties is required',
    'array.base': 'secondaryDisplayProperties must be an array',
    'string.base': 'Each item in secondaryDisplayProperties must be a string',
    'array.min': 'secondaryDisplayProperties must have at least one item',
  }),
  requiredProperties: Joi.array().min(1).items(Joi.string()).required().messages({
    'any.required': 'requiredProperties is required',
    'array.base': 'requiredProperties must be an array',
    'string.base': 'Each item in requiredProperties must be a string',
    'array.min': 'requiredProperties must have at least one item',
  }),
  searchableProperties: Joi.array().min(1).items(Joi.string()).required().messages({
    'any.required': 'searchableProperties is required',
    'array.base': 'searchableProperties must be an array',
    'string.base': 'Each item in searchableProperties must be a string',
    'array.min': 'searchableProperties must have at least one item',
  }),
  properties: Joi.array().required().items(
    Joi.object().required().keys({
      name: Joi.string().required().messages({
        'any.required': 'name is required',
        'string.base': 'name must be a string',
        'string.empty': 'name is not allowed to be empty',
      }),
      label: Joi.string().required().messages({
        'any.required': 'label is required',
        'string.base': 'label must be a string',
        'string.empty': 'label is not allowed to be empty',
      }),
      type: Joi.string().valid('enumeration', 'date', 'number', 'string').required().messages({
        'any.required': 'type is required',
        'string.base': 'type must be a string',
        'string.empty': 'type is not allowed to be empty',
        'any.only': 'type must be one of [enumeration, date, number, string]',
      }),
      fieldType: Joi.string().valid('text', 'textarea', 'date', 'number', 'booleancheckbox', 'select', 'checkbox', 'file', 'radio').required().messages({
        'any.required': 'fieldType is required',
        'string.base': 'fieldType must be a string',
        'string.empty': 'fieldType is not allowed to be empty',
        'any.only': 'fieldType must be one of [select, date, number, text]',
      }),
      options: Joi.array().when('fieldType', {
        is: 'select',
        then: Joi.array().items(
          Joi.object().keys({
            label: Joi.string().required().messages({
              'any.required': 'option.label is required',
              'string.base': 'option.label must be a string',
              'string.empty': 'option.label is not allowed to be empty',
            }),
            value: Joi.string().required().messages({
              'any.required': 'option.value is required',
              'string.base': 'option.value must be a string',
              'string.empty': 'option.value is not allowed to be empty',
            }),
          })
        ).required().messages({
          'any.required': 'options are required when fieldType is select',
          'array.base': 'options must be an array when fieldType is select',
          'array.includesRequiredUnknowns': 'Each option must be an object with label and value',
        }),
        otherwise: Joi.forbidden(),
      }),
    })
  ),
}).custom((value, helpers) => {
  const { requiredProperties, properties } = value;
  const propertyNames = properties.map(prop => prop.name);
  const missingProperties = requiredProperties.filter(prop => !propertyNames.includes(prop));
  if (missingProperties.length > 0) return helpers.error('custom.requiredPropertiesNotFound', { missingProperties: missingProperties.join(', ') });

  return value;
}, 'Custom Validation for Required Properties').messages({
  'custom.requiredPropertiesNotFound': 'Required properties {#missingProperties} are not found in properties',
});


const hubspotUpdateCustomObjectsSchema = Joi.object({
  associatedObjects: Joi.array().items(Joi.string().valid('CONTACT', 'COMPANY', 'DEAL')).messages({
    'array.base': 'associatedObjects must be an array',
    'string.base': 'Each item in associatedObjects must be a string',
  }),
  name: Joi.string().messages({
    'string.base': 'name must be a string',
    'string.empty': 'name is not allowed to be empty',
  }),
  description: Joi.string().messages({
    'string.base': 'description must be a string',
    'string.empty': 'description is not allowed to be empty',
  }),
  labels: Joi.object().keys({
    singular: Joi.string().messages({
      'string.base': 'singular must be a string',
      'string.empty': 'singular is not allowed to be empty',
    }),
    plural: Joi.string().messages({
      'string.base': 'plural must be a string',
      'string.empty': 'plural is not allowed to be empty',
    }),
  }),
  primaryDisplayProperty: Joi.string().messages({
    'string.base': 'primaryDisplayProperty must be a string',
    'string.empty': 'primaryDisplayProperty is not allowed to be empty',
  }),
  secondaryDisplayProperties: Joi.array().items(Joi.string()).messages({
    'array.base': 'secondaryDisplayProperties must be an array',
    'string.base': 'Each item in secondaryDisplayProperties must be a string',
  }),
  requiredProperties: Joi.array().items(Joi.string()).messages({
    'array.base': 'requiredProperties must be an array',
    'string.base': 'Each item in requiredProperties must be a string',
  }),
  searchableProperties: Joi.array().items(Joi.string()).messages({
    'array.base': 'searchableProperties must be an array',
    'string.base': 'Each item in searchableProperties must be a string',
  }),
  properties: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().messages({
        'string.base': 'name must be a string',
        'string.empty': 'name is not allowed to be empty',
      }),
      label: Joi.string().messages({
        'string.base': 'label must be a string',
        'string.empty': 'label is not allowed to be empty',
      }),
      type: Joi.string().valid('enumeration', 'date', 'number', 'string').messages({
        'string.base': 'type must be a string',
        'string.empty': 'type is not allowed to be empty',
        'any.only': 'type must be one of [enumeration, date, number, string]',
      }),
      fieldType: Joi.string().valid('text', 'textarea', 'date', 'number', 'booleancheckbox', 'select', 'checkbox', 'file', 'radio').messages({
        'string.base': 'fieldType must be a string',
        'string.empty': 'fieldType is not allowed to be empty',
        'any.only': 'fieldType must be one of [select, date, number, text]',
      }),
      options: Joi.array().items(
        Joi.object().keys({
          label: Joi.string().messages({
            'string.base': 'option.label must be a string',
            'string.empty': 'option.label is not allowed to be empty',
          }),
          value: Joi.string().messages({
            'string.base': 'option.value must be a string',
            'string.empty': 'option.value is not allowed to be empty',
          }),
        })
      ).messages({
        'array.base': 'options must be an array',
        'array.includesRequiredUnknowns': 'Each option must be an object with label and value',
      }).when('fieldType', {
        is: 'select',
        then: Joi.array().min(1).required().messages({
          'array.min': 'options must have at least one item when fieldType is select',
        }),
        otherwise: Joi.forbidden(),
      }),
    })
  ).messages({
    'array.base': 'properties must be an array',
    'array.includesRequiredUnknowns': 'Each item in properties must be an object with required fields',
  }),
}).custom((value, helpers) => {
  const { requiredProperties, properties } = value;
  if (requiredProperties && properties) {
    const propertyNames = properties.map(prop => prop.name);
    const missingProperties = requiredProperties.filter(prop => !propertyNames.includes(prop));
    if (missingProperties.length > 0) return helpers.error('custom.requiredPropertiesNotFound', { missingProperties: missingProperties.join(', ') });
  }

  return value;
}, 'Custom Validation for Required Properties').messages({
  'custom.requiredPropertiesNotFound': 'Required properties {#missingProperties} are not found in properties',
});

export {
  hubspotListSchema,
  hubspotCreateContactSchema,
  hubspotUpdateContactSchema,
  hubspotCreatePipelineSchema,
  hubspotUpdateDealsPipelineSchema,
  hubspotCreateDealsSchema,
  hubspotUpdateDealsSchema,
  hubspotSearchContactsSchema,
  hubspotCreateCompanySchema,
  hubspotUpdateCompanySchema,
  hubspotCreateCustomObjectsSchema,
  hubspotUpdateCustomObjectsSchema
};