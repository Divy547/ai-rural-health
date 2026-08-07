import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  APP_NAME: Joi.string().required(),

  PORT: Joi.number()
    .port()
    .default(3000),

  API_PREFIX: Joi.string().default('api'),

  API_VERSION: Joi.string().default('v1'),

  CORS_ORIGIN: Joi.string().required(),

  // Database
  DATABASE_URL: Joi.string()
    .uri()
    .required(),

  // Authentication
  JWT_ACCESS_SECRET: Joi.string()
    .min(6)
    .required(),

  JWT_ACCESS_EXPIRES_IN: Joi.string()
    .pattern(/^\d+[smhd]$/)
    .default('15m'),

  JWT_REFRESH_SECRET: Joi.string()
    .min(6)
    .required(),

  JWT_REFRESH_EXPIRES_IN: Joi.string()
    .pattern(/^\d+[smhd]$/)
    .default('7d'),

  // Google OAuth (optional for MVP)
  GOOGLE_CLIENT_ID: Joi.string()
    .allow('')
    .default(''),

  GOOGLE_CLIENT_SECRET: Joi.string()
    .allow('')
    .default(''),

  GOOGLE_CALLBACK_URL: Joi.string()
    .uri()
    .allow('')
    .default(''),

  // AI Service
  AI_SERVICE_URL: Joi.string()
    .uri()
    .required(),

  AI_SERVICE_API_KEY: Joi.string()
    .allow('')
    .default(''),

  // Logging
  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .default('info'),

  // Swagger
  SWAGGER_ENABLED: Joi.boolean().default(true),
});