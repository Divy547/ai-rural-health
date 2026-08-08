import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OAuth2Client,
  TokenPayload,
} from 'google-auth-library';

import { User } from '@prisma/client';

import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GoogleService {
  private readonly client: OAuth2Client;
  private readonly webClientId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    this.webClientId =
      this.configService.getOrThrow<string>(
        'auth.google.webClientId',
      );

    this.client = new OAuth2Client(
      this.webClientId,
    );
  }

  async verifyIdToken(
    idToken: string,
  ): Promise<TokenPayload> {
    const ticket =
      await this.client.verifyIdToken({
        idToken,
        audience: this.webClientId,
      });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error(
        'Invalid Google ID token payload.',
      );
    }

    return payload;
  }

  async findOrCreateUser(
    payload: TokenPayload,
  ): Promise<{
    user: User;
    isNewUser: boolean;
  }> {
    const googleId = payload.sub;
    const email = payload.email;

    if (!googleId) {
      throw new Error(
        'Google account ID is missing.',
      );
    }

    if (!email) {
      throw new Error(
        'Google account email is missing.',
      );
    }

    const existingGoogleUser =
      await this.userRepository.findByGoogleId(
        googleId,
      );

    if (existingGoogleUser) {
      return {
        user: existingGoogleUser,
        isNewUser: false,
      };
    }

    const existingEmailUser =
      await this.userRepository.findByEmail(email);

    if (existingEmailUser) {
      throw new ConflictException(
        'An account with this email already exists. Please sign in using the existing authentication method.',
      );
    }

    const user =
      await this.userRepository.create({
        googleId,
        email,
        fullName: payload.name,
        language: 'en',
      });

    return {
      user,
      isNewUser: true,
    };
  }
}