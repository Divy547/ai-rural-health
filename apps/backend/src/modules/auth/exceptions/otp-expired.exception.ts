import { HttpStatus } from '@nestjs/common';

import { AuthException } from './auth.exception';
import { AUTH_MESSAGES } from '../constants/auth.messages';

export class OtpExpiredException extends AuthException {
  constructor() {
    super(AUTH_MESSAGES.OTP_EXPIRED, HttpStatus.UNAUTHORIZED);
  }
}