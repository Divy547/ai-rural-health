import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ms, { type StringValue } from 'ms';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { TokenPair } from '../types/auth.types';
import { AUTH_CONSTANTS } from '../constants/auth.constants';
import { addDuration } from 'src/common/utils/date.utils';

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: StringValue;

  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: StringValue;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.getOrThrow<string>(
      'auth.jwt.accessSecret',
    );

    this.accessExpiresIn = this.configService.getOrThrow<StringValue>(
      'auth.jwt.accessExpiresIn',
    );

    this.refreshSecret = this.configService.getOrThrow<string>(
      'auth.jwt.refreshSecret',
    );

    this.refreshExpiresIn = this.configService.getOrThrow<StringValue>(
      'auth.jwt.refreshExpiresIn',
    );
  }

  async generateAccessToken(
    payload: JwtPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn,
    });
  }

  async generateRefreshToken(
    payload: JwtPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
    });
  }

  async generateTokenPair(
    payload: JwtPayload,
  ): Promise<TokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  getRefreshTokenExpiryDate(): Date {

    return addDuration(this.refreshExpiresIn);
  }

  async hashRefreshToken(
    refreshToken: string,
  ): Promise<string> {
    return bcrypt.hash(
      refreshToken,
      AUTH_CONSTANTS.BCRYPT.SALT_ROUNDS,
    );
  }

  async compareRefreshToken(
    refreshToken: string,
    hashedToken: string,
  ): Promise<boolean> {
    return bcrypt.compare(refreshToken, hashedToken);
  }

  async verifyAccessToken(
    token: string,
  ): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.accessSecret,
    });
  }

  async verifyRefreshToken(
    token: string,
  ): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.refreshSecret,
    });
  }
}