import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME ?? 'AI Rural Health Backend',

  env: process.env.NODE_ENV ?? 'development',

  port: Number(process.env.PORT ?? 3000),

  apiPrefix: process.env.API_PREFIX ?? 'api',

  apiVersion: process.env.API_VERSION ?? 'v1',

  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3001',
}));
