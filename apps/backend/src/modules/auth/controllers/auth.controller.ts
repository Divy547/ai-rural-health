import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

import { GoogleLoginDto } from '../dto/google-login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SendOtpDto } from '../dto/send-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';

import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.authService.me(user.sub);
  }

  @Post('otp/send')
  async sendOtp(
    @Body() dto: SendOtpDto,
  ) {
    return this.authService.sendOtp(
      dto.phone,
    );
  }

  @Post('otp/verify')
  async verifyOtp(
    @Body() dto: VerifyOtpDto,
  ) {
    return this.authService.verifyOtp(
      dto.phone,
      dto.otp,
    );
  }

  @Post('google')
  async loginWithGoogle(
    @Body() dto: GoogleLoginDto,
  ) {
    return this.authService.loginWithGoogle(
      dto.idToken,
    );
  }

  @Post('refresh')
  async refresh(
    @Body() dto: RefreshTokenDto,
  ) {
    return this.authService.refresh(
      dto.refreshToken,
    );
  }

  @Post('logout')
  async logout(
    @Body() dto: RefreshTokenDto,
  ) {
    await this.authService.logout(
      dto.refreshToken,
    );

    return {
      message: 'Logged out successfully',
    };
  }
}