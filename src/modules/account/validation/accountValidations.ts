import Joi from 'joi';

const createAccountTypeSchema = Joi.object({
  'accountType': Joi.string().required().messages({
    'any.required': 'accountType is required',
    'string.base': 'accountType should be a type of text',
    'string.empty': 'accountType cannot be an empty field',
}),
});

export { createAccountTypeSchema };