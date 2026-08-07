import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

import { AuthController } from './controllers/auth.controller';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from './repositories/user.repository';
import { OtpRepository } from './repositories/otp.repository';
import { SessionRepository } from './repositories/session.repository';

import { OtpService } from './services/otp.service';
// import { GoogleService } from './services/google.service';



@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({}),
    PrismaModule,
    
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    OtpService,
    // GoogleService,

    UserRepository,
    OtpRepository,
    SessionRepository,
  ],

  exports: [AuthService],
})
export class AuthModule {}