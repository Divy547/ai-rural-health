import { HttpStatus } from '@nestjs/common';

import { AuthException } from './auth.exception';
import { AUTH_MESSAGES } from '../constants/auth.messages';

export class InvalidRefreshTokenException extends AuthException {
  constructor() {
    super(AUTH_MESSAGES.INVALID_REFRESH_TOKEN, HttpStatus.UNAUTHORIZED);
  }
}