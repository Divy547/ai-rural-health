import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      clientID:
        configService.getOrThrow<string>(
          'auth.google.clientId',
        ),

      clientSecret:
        configService.getOrThrow<string>(
          'auth.google.clientSecret',
        ),

      callbackURL:
        configService.getOrThrow<string>(
          'auth.google.callbackUrl',
        ),

      scope: [
        'email',
        'profile',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails, photos } = profile;

    return {
      googleId: id,
      email: emails?.[0]?.value ?? null,
      fullName:
        name
          ? `${name.givenName ?? ''} ${name.familyName ?? ''}`.trim()
          : null,
      avatarUrl: photos?.[0]?.value ?? null,
    };
  }
}