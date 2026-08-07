import { HttpStatus } from '@nestjs/common';

import { AuthException } from './auth.exception';
import { AUTH_MESSAGES } from '../constants/auth.messages';

export class SessionRevokedException extends AuthException {
  constructor() {
    super(AUTH_MESSAGES.SESSION_REVOKED, HttpStatus.UNAUTHORIZED);
  }
}