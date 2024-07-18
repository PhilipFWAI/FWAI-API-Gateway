import Joi from 'joi';

const customerDetailsSchema = Joi.object({
  customerInfo: Joi.object().required().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.email': 'email must be a valid email',
      'string.base': 'email should be a type of text',
      'string.empty': 'email cannot be an empty field',
    }),
    name: Joi.string().required().messages({
      'any.required': 'name is required and is customer name',
      'string.base': 'name must be a string and is customer name',
      'string.empty': 'name is not allowed to be empty and is  customer name',
    }),
  })
});

const planDetailsSchema = Joi.object({
  planInfo: Joi.object().required().keys({
    name: Joi.string().required().messages({
      'any.required': 'name is required and is plan name',
      'string.base': 'name must be a string and is plan name',
      'string.empty': 'name is not allowed to be empty and is plan name',
    }),
    active: Joi.boolean().required().messages({
      'any.required': 'active is required and is plan active',
      'string.base': 'active must be a string and is plan active',
      'string.empty': 'active is not allowed to be empty and is plan active',
    }),
    url:  Joi.string().required().messages({
      'any.required': 'url is required and is plan url',
      'string.base': 'url must be a string and is plan url',
      'string.empty': 'url is not allowed to be empty and is plan url',
    }),
    description:  Joi.string().required().messages({
      'any.required': 'description is required and is plan description',
      'string.base': 'description must be a string and is plan description',
      'string.empty': 'description is not allowed to be empty and is plan description',
    }),
    'images[0]':  Joi.string().required().messages({
      'any.required': 'images[0] is required and is plan first image',
      'string.base': 'images[0] must be a string and is plan first image',
      'string.empty': 'images[0] is not allowed to be empty and is plan first image',
    }),
    'images[1]':  Joi.string().messages({
      'any.required': 'images[1] is required and is plan second image',
      'string.base': 'images[1] must be a string and is plan second image',
      'string.empty': 'images[1] is not allowed to be empty and is plan second image',
    }),
  })
});

const priceDetailsSchema = Joi.object({
  priceInfo: Joi.object().required().keys({
    product: Joi.string().required().messages({
      'any.required': 'product is required and is plan',
      'string.base': 'product must be a string and is plan',
      'string.empty': 'product is not allowed to be empty and is plan',
    }),
    unit_amount: Joi.number().required().messages({
      'any.required': 'unit_amount is required and is unit_amount',
      'string.base': 'unit_amount must be a string and is unit_amount',
      'string.empty': 'unit_amount is not allowed to be empty and is unit_amount',
    }),
    currency: Joi.string().required().valid('usd', 'aed', 'afn', 'all', 'amd', 'ang', 'aoa', 'ars', 'aud', 'awg', 'azn', 'bam', 'bbd', 'bdt', 'bgn', 'bhd', 'bif', 'bmd', 'bnd', 'bob', 'brl', 'bsd', 'bwp', 'byn', 'bzd', 'cad', 'cdf', 'chf', 'clp', 'cny', 'cop', 'crc', 'cve', 'czk', 'djf', 'dkk', 'dop', 'dzd', 'egp', 'etb', 'eur', 'fjd', 'fkp', 'gbp', 'gel', 'gip', 'gmd', 'gnf', 'gtq', 'gyd', 'hkd', 'hnl', 'hrk', 'htg', 'huf', 'idr', 'ils', 'inr', 'isk', 'jmd', 'jod', 'jpy', 'kes', 'kgs', 'khr', 'kmf', 'krw', 'kwd', 'kyd', 'kzt', 'lak', 'lbp', 'lkr', 'lrd', 'lsl', 'mad', 'mdl', 'mga', 'mkd', 'mmk', 'mnt', 'mop', 'mur', 'mvr', 'mwk', 'mxn', 'myr', 'mzn', 'nad', 'ngn', 'nio', 'nok', 'npr', 'nzd', 'omr', 'pab', 'pen', 'pgk', 'php', 'pkr', 'pln', 'pyg', 'qar', 'ron', 'rsd', 'rub', 'rwf', 'sar', 'sbd', 'scr', 'sek', 'sgd', 'shp', 'sle', 'sos', 'srd', 'std', 'szl', 'thb', 'tjs', 'tnd', 'top', 'try', 'ttd', 'twd', 'tzs', 'uah', 'ugx', 'uyu', 'uzs', 'vnd', 'vuv', 'wst', 'xaf', 'xcd', 'xof', 'xpf', 'yer', 'zar', 'zmw', 'usdc', 'btn', 'ghs', 'eek', 'lvl', 'svc', 'vef', 'ltl', 'sll', 'mro').messages({
      'any.required': 'currency is required and is currency',
      'string.base': 'currency must be a string and is currency',
      'string.empty': 'currency is not allowed to be empty and is currency',
    }),
    recurring: Joi.object().required().keys({
      interval: Joi.string().required().valid('day', 'month', 'week', 'year').messages({
        'any.required': 'interval is required and is interval',
        'string.base': 'interval must be a string and is interval',
        'string.empty': 'interval is not allowed to be empty and is interval',
      }),
      interval_count: Joi.number().required().messages({
        'any.required': 'interval_count is required and is interval_count',
        'string.base': 'interval_count must be a string and is interval_count',
        'string.empty': 'interval_count is not allowed to be empty and is interval_count',
      }),
      // trial_period_days: Joi.string().allow(null).required().messages({
      //   'any.required': 'trial_period_days is required and is trial_period_days',
      //   'string.base': 'trial_period_days must be a string and is trial_period_days',
      //   'string.empty': 'trial_period_days is not allowed to be empty and is trial_period_days',
      // }),
    }),
  })
});

const checkoutSessionSchema = Joi.object({
  sessionInfo: Joi.object().required().keys({
    success_url:  Joi.string().messages({
      'any.required': 'success_url is required',
      'string.base': 'success_url must be a string',
      'string.empty': 'success_url is not allowed to be empty',
    }),
    cancel_url:  Joi.string().messages({
      'any.required': 'cancel_url is required',
      'string.base': 'cancel_url must be a string',
      'string.empty': 'cancel_url is not allowed to be empty',
    }),
    return_url:  Joi.string().messages({
      'any.required': 'return_url is required',
      'string.base': 'return_url must be a string',
      'string.empty': 'return_url is not allowed to be empty',
    }),
    customer: Joi.string().required().messages({
      'any.required': 'customer is required and is customer id',
      'string.base': 'customer must be a string and is customer id',
      'string.empty': 'customer is not allowed to be empty and is customer id',
    }),
    mode: Joi.string().required().valid('payment', 'setup', 'subscription').messages({
      'any.required': 'mode is required',
      'string.base': 'mode must be a string',
      'string.empty': 'mode is not allowed to be empty',
    }),
    ui_mode: Joi.string().required().valid('hosted', 'embedded').messages({
      'any.required': 'ui_mode is required',
      'string.base': 'ui_mode must be a string',
      'string.empty': 'ui_mode is not allowed to be empty',
    }),
    payment_method_types: Joi.array().required().items(Joi.string().valid('card', 'link', 'cashapp')),
    line_items: Joi.array().required().items(
      Joi.object().keys({
        quantity: Joi.number().integer().default(1).required(),
        price: Joi.string().required().messages({
          'any.required': 'price is required and is price id',
          'string.base': 'price must be a string and is price id',
          'string.empty': 'price is not allowed to be empty and is price id',
        }),
      })
    ),
  })
});

const completeCheckoutSessionSchema = Joi.object({
  customerInfo: Joi.object().required().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.email': 'email must be a valid email',
      'string.base': 'email should be a type of text',
      'string.empty': 'email cannot be an empty field',
    }),
    name: Joi.string().required().messages({
      'any.required': 'name is required and is customer name',
      'string.base': 'name must be a string and is customer name',
      'string.empty': 'name is not allowed to be empty and is  customer name',
    }),
  }),
  planInfo: Joi.object().required().keys({
    name: Joi.string().required().messages({
      'any.required': 'name is required and is plan name',
      'string.base': 'name must be a string and is plan name',
      'string.empty': 'name is not allowed to be empty and is plan name',
    }),
    active: Joi.boolean().required().messages({
      'any.required': 'active is required and is plan active',
      'string.base': 'active must be a string and is plan active',
      'string.empty': 'active is not allowed to be empty and is plan active',
    }),
    url:  Joi.string().required().messages({
      'any.required': 'url is required and is plan url',
      'string.base': 'url must be a string and is plan url',
      'string.empty': 'url is not allowed to be empty and is plan url',
    }),
    description:  Joi.string().required().messages({
      'any.required': 'description is required and is plan description',
      'string.base': 'description must be a string and is plan description',
      'string.empty': 'description is not allowed to be empty and is plan description',
    }),
    'images[0]':  Joi.string().required().messages({
      'any.required': 'images[0] is required and is plan first image',
      'string.base': 'images[0] must be a string and is plan first image',
      'string.empty': 'images[0] is not allowed to be empty and is plan first image',
    }),
    'images[1]':  Joi.string().messages({
      'any.required': 'images[1] is required and is plan second image',
      'string.base': 'images[1] must be a string and is plan second image',
      'string.empty': 'images[1] is not allowed to be empty and is plan second image',
    }),
  }),
  priceInfo: Joi.object().required().keys({
    product: Joi.string().required().messages({
      'any.required': 'product is required and is plan',
      'string.base': 'product must be a string and is plan',
      'string.empty': 'product is not allowed to be empty and is plan',
    }),
    unit_amount: Joi.number().required().messages({
      'any.required': 'unit_amount is required and is unit_amount',
      'string.base': 'unit_amount must be a string and is unit_amount',
      'string.empty': 'unit_amount is not allowed to be empty and is unit_amount',
    }),
    currency: Joi.string().required().valid('usd', 'aed', 'afn', 'all', 'amd', 'ang', 'aoa', 'ars', 'aud', 'awg', 'azn', 'bam', 'bbd', 'bdt', 'bgn', 'bhd', 'bif', 'bmd', 'bnd', 'bob', 'brl', 'bsd', 'bwp', 'byn', 'bzd', 'cad', 'cdf', 'chf', 'clp', 'cny', 'cop', 'crc', 'cve', 'czk', 'djf', 'dkk', 'dop', 'dzd', 'egp', 'etb', 'eur', 'fjd', 'fkp', 'gbp', 'gel', 'gip', 'gmd', 'gnf', 'gtq', 'gyd', 'hkd', 'hnl', 'hrk', 'htg', 'huf', 'idr', 'ils', 'inr', 'isk', 'jmd', 'jod', 'jpy', 'kes', 'kgs', 'khr', 'kmf', 'krw', 'kwd', 'kyd', 'kzt', 'lak', 'lbp', 'lkr', 'lrd', 'lsl', 'mad', 'mdl', 'mga', 'mkd', 'mmk', 'mnt', 'mop', 'mur', 'mvr', 'mwk', 'mxn', 'myr', 'mzn', 'nad', 'ngn', 'nio', 'nok', 'npr', 'nzd', 'omr', 'pab', 'pen', 'pgk', 'php', 'pkr', 'pln', 'pyg', 'qar', 'ron', 'rsd', 'rub', 'rwf', 'sar', 'sbd', 'scr', 'sek', 'sgd', 'shp', 'sle', 'sos', 'srd', 'std', 'szl', 'thb', 'tjs', 'tnd', 'top', 'try', 'ttd', 'twd', 'tzs', 'uah', 'ugx', 'uyu', 'uzs', 'vnd', 'vuv', 'wst', 'xaf', 'xcd', 'xof', 'xpf', 'yer', 'zar', 'zmw', 'usdc', 'btn', 'ghs', 'eek', 'lvl', 'svc', 'vef', 'ltl', 'sll', 'mro').messages({
      'any.required': 'currency is required and is currency',
      'string.base': 'currency must be a string and is currency',
      'string.empty': 'currency is not allowed to be empty and is currency',
    }),
    recurring: Joi.object().required().keys({
      interval: Joi.string().required().valid('day', 'month', 'week', 'year').messages({
        'any.required': 'interval is required and is interval',
        'string.base': 'interval must be a string and is interval',
        'string.empty': 'interval is not allowed to be empty and is interval',
      }),
      interval_count: Joi.number().required().messages({
        'any.required': 'interval_count is required and is interval_count',
        'string.base': 'interval_count must be a string and is interval_count',
        'string.empty': 'interval_count is not allowed to be empty and is interval_count',
      }),
      trial_period_days: Joi.string().allow(null).required().messages({
        'any.required': 'trial_period_days is required and is trial_period_days',
        'string.base': 'trial_period_days must be a string and is trial_period_days',
        'string.empty': 'trial_period_days is not allowed to be empty and is trial_period_days',
      }),
    }),
  }),
  sessionInfo: Joi.object().required().keys({
    success_url:  Joi.string().messages({
      'any.required': 'success_url is required',
      'string.base': 'success_url must be a string',
      'string.empty': 'success_url is not allowed to be empty',
    }),
    cancel_url:  Joi.string().messages({
      'any.required': 'cancel_url is required',
      'string.base': 'cancel_url must be a string',
      'string.empty': 'cancel_url is not allowed to be empty',
    }),
    return_url:  Joi.string().messages({
      'any.required': 'return_url is required',
      'string.base': 'return_url must be a string',
      'string.empty': 'return_url is not allowed to be empty',
    }),
    customer: Joi.string().required().messages({
      'any.required': 'customer is required and is customer id',
      'string.base': 'customer must be a string and is customer id',
      'string.empty': 'customer is not allowed to be empty and is customer id',
    }),
    mode: Joi.string().required().valid('payment', 'setup', 'subscription').messages({
      'any.required': 'mode is required',
      'string.base': 'mode must be a string',
      'string.empty': 'mode is not allowed to be empty',
    }),
    ui_mode: Joi.string().required().valid('hosted', 'embedded').messages({
      'any.required': 'ui_mode is required',
      'string.base': 'ui_mode must be a string',
      'string.empty': 'ui_mode is not allowed to be empty',
    }),
    payment_method_types: Joi.array().required().items(Joi.string().valid('card', 'link', 'cashapp')),
    line_items: Joi.array().required().items(
      Joi.object().keys({
        quantity: Joi.number().integer().default(1).required(),
        price: Joi.string().required().messages({
          'any.required': 'price is required and is price id',
          'string.base': 'price must be a string and is price id',
          'string.empty': 'price is not allowed to be empty and is price id',
        }),
      })
    ),
  })
});

export { customerDetailsSchema, planDetailsSchema, priceDetailsSchema, checkoutSessionSchema, completeCheckoutSessionSchema };
