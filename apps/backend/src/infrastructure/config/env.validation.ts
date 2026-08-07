import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required(),

  APP_NAME: Joi.string().required(),

  PORT: Joi.number().default(3000),

  API_PREFIX: Joi.string().default('api'),

  API_VERSION: Joi.string().default('v1'),

  CORS_ORIGIN: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().required(),

  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),

  JWT_REFRESH_SECRET: Joi.string().required(),

  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().allow('').optional(),

  GOOGLE_CLIENT_SECRET: Joi.string().allow('').optional(),

  GOOGLE_CALLBACK_URL: Joi.string().allow('').optional(),

  AI_SERVICE_URL: Joi.string().required(),

  AI_SERVICE_API_KEY: Joi.string().allow('').optional(),

  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .required(),

  SWAGGER_ENABLED: Joi.boolean().required(),
});