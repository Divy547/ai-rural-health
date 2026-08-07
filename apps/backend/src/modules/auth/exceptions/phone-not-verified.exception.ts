import { HttpStatus } from '@nestjs/common';

import { AuthException } from './auth.exception';
import { AUTH_MESSAGES } from '../constants/auth.messages';

export class PhoneNotVerifiedException extends AuthException {
  constructor() {
    super(AUTH_MESSAGES.PHONE_NOT_VERIFIED, HttpStatus.FORBIDDEN);
  }
}