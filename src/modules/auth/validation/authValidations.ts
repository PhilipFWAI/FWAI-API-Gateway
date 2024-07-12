import Joi from 'joi';

const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
      'string.base': 'email should be a type of text',
      'string.email': 'email must be a valid email',
      'string.empty': 'email cannot be an empty field',
      'any.required': 'email is required'
  }),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$')).required().messages({
      'string.base': 'password should be a type of text',
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password should have a minimum length of 8',
      'string.pattern.base': 'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'password is required'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  accountType_id: Joi.number().integer().valid(1, 2, 3).required().messages({
    'string.base': 'accountType_id must be a string. 1 for business, 2 for personal and 3 for developer',
    'any.required': 'accountType_id is required. . 1 for business, 2 for personal and 3 for developer',
    'any.only': 'accountType_id must be either \'1\', \'2\' or \'3\'. 1 for business, 2 for personal and 3 for developer',
  }),
});

const userDeviceSchema = Joi.object().keys({
  'user-device': Joi.string().required().messages({
      'any.required': 'User-Device is required in the headers',
      'string.base': 'User-Device should be a type of text in the headers',
      'string.empty': 'User-Device cannot be an empty field in the headers',
  }),
}).unknown(true);

const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
      'string.base': 'email should be a type of text',
      'string.email': 'email must be a valid email',
      'string.empty': 'email cannot be an empty field',
      'any.required': 'email is required'
  }),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$')).required().messages({
      'string.base': 'password should be a type of text',
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password should have a minimum length of 8',
      'string.pattern.base': 'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'password is required'
  }),
});

const gatewayAuthorizationSchema = Joi.object().keys({
  'gateway-authorization': Joi.string().required().messages({
      'any.required': 'Gateway-Authorization is required in the headers',
      'string.base': 'Gateway-Authorization should be a type of text in the headers',
      'string.empty': 'Gateway-Authorization cannot be an empty field in the headers',
  })
}).unknown(true);

export { signupSchema, userDeviceSchema, signinSchema, gatewayAuthorizationSchema };