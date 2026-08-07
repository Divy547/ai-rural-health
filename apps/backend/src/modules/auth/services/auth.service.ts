import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { AUTH_MESSAGES } from '../constants/auth.messages';

import { OtpService } from './otp.service';
import { TokenService } from './token.service';

import { UserRepository } from '../repositories/user.repository';
import { SessionRepository } from '../repositories/session.repository';

import {
    SendOtpResult,
    VerifyOtpResult,
} from '../types/auth.types';
import { UserNotFoundException } from '../exceptions';
import { UserMapper } from '../mappers/user.mapper';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthMapper } from '../mappers/auth.mapper';

@Injectable()
export class AuthService {
    constructor(
        private readonly otpService: OtpService,
        private readonly tokenService: TokenService,

        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
    ) { }

    async sendOtp(phone: string): Promise<SendOtpResult> {
        await this.otpService.sendOtp(phone);

        return {
            message: AUTH_MESSAGES.OTP_SENT,
        };
    }

    async verifyOtp(
        phone: string,
        otp: string,
    ): Promise<AuthResponseDto> {
        /**
         * Step 1
         * Verify the OTP.
         */
        await this.otpService.verifyOtp(phone, otp);

        /**
         * Step 2
         * Find the existing user or create a new one.
         */
        const { user, isNewUser } =
            await this.findOrCreateUser(phone);

        /**
         * Step 3
         * Generate JWT tokens.
         */
        const {
            accessToken,
            refreshToken,
        } = await this.tokenService.generateTokenPair({
            sub: user.id,
            role: user.role,
        });

        /**
         * Step 4
         * Persist the refresh token session.
         */
        const tokenHash =
            await this.tokenService.hashRefreshToken(
                refreshToken,
            );

        await this.sessionRepository.create({
            userId: user.id,
            tokenHash,
            expiresAt:
                this.tokenService.getRefreshTokenExpiryDate(),
        });

        /**
         * Step 5
         * Return the authentication response.
         */
        return AuthMapper.toAuthResponse(
            accessToken,
            refreshToken,
            isNewUser,
            user,
        );
    }

    private async findOrCreateUser(
        phone: string,
    ): Promise<{
        user: User;
        isNewUser: boolean;
    }> {
        const existingUser =
            await this.userRepository.findByPhone(phone);

        if (existingUser) {
            return {
                user: existingUser,
                isNewUser: false,
            };
        }

        const newUser =
            await this.userRepository.create({
                phone,
                role: Role.USER,
            });

        return {
            user: newUser,
            isNewUser: true,
        };
    }


    async me(userId: string) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new UserNotFoundException();
        }

        return UserMapper.toProfileDto(user);
    }
}