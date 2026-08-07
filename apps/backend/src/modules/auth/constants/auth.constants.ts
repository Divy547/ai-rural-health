export const AUTH_CONSTANTS = {
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 5,
  },

  BCRYPT: {
    SALT_ROUNDS: 10,
  },

  JWT: {
    ACCESS_COOKIE: 'access_token',
    REFRESH_COOKIE: 'refresh_token',
  },
} as const;