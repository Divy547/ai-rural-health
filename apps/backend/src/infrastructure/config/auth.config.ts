import { registerAs } from '@nestjs/config';
import type { StringValue } from 'ms';

export default registerAs('auth', () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as StringValue,

    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
  },

  google: {
    webClientId:
      process.env.GOOGLE_WEB_CLIENT_ID ?? '',
  },
}));