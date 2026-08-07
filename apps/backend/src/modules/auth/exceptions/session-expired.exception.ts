import { HttpStatus } from '@nestjs/common';

import { AuthException } from './auth.exception';
import { AUTH_MESSAGES } from '../constants/auth.messages';

export class SessionExpiredException extends AuthException {
  constructor() {
    super(AUTH_MESSAGES.SESSION_EXPIRED, HttpStatus.UNAUTHORIZED);
  }
}