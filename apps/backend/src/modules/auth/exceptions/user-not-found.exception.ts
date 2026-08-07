import { HttpStatus } from '@nestjs/common';

import { AuthException } from './auth.exception';
import { AUTH_MESSAGES } from '../constants/auth.messages';

export class UserNotFoundException extends AuthException {
  constructor() {
    super(AUTH_MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}