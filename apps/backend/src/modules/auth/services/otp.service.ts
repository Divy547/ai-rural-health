import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { OtpRepository } from '../repositories/otp.repository';
import { AUTH_CONSTANTS } from '../constants/auth.constants';
import * as OtpUtil from '../../../common/utils/otp.util';
import { isOtpExpired } from '../../../common/utils/otp.util';

@Injectable()
export class OtpService {
    private readonly logger = new Logger(OtpService.name);

    constructor(
        private readonly otpRepository: OtpRepository,
    ) { }


    async sendOtp(phone: string): Promise<string> {
        const otp = OtpUtil.generateNumericOtp(
            AUTH_CONSTANTS.OTP.LENGTH,
        );

        const hash = await this.hashOtp(otp);

        await this.otpRepository.deleteByPhone(phone);

        await this.otpRepository.create({
            phone,
            codeHash: hash,
            expiresAt: OtpUtil.getOtpExpiry(
                AUTH_CONSTANTS.OTP.EXPIRY_MINUTES,
            ),
        });

        /**
         * Temporary
         *
         * Later:
         * smsProvider.send(phone, otp)
         */
        console.log(`OTP for ${phone}: ${otp}`);
        this.logger.debug(
            `OTP for ${phone}: ${otp}`,
        );

        return otp;
    }

    async verifyOtp(
        phone: string,
        otp: string,
    ): Promise<boolean> {
        const storedOtp =
            await this.otpRepository.findLatest(phone);

        if (!storedOtp) {
            throw new UnauthorizedException(
                'OTP not found',
            );
        }

        if (isOtpExpired(storedOtp.expiresAt)) {
            await this.otpRepository.delete(storedOtp.id);

            throw new UnauthorizedException(
                'OTP expired',
            );
        }

        const isValid = await this.compareOtp(
            otp,
            storedOtp.codeHash,
        );

        if (!isValid) {
            throw new UnauthorizedException(
                'Invalid OTP',
            );
        }

        await this.otpRepository.delete(storedOtp.id);

        return true;
    }

    async cleanupExpiredOtps() {
        return this.otpRepository.deleteExpired();
    }

    private hashOtp(otp: string) {
        return bcrypt.hash(
            otp,
            AUTH_CONSTANTS.BCRYPT.SALT_ROUNDS,
        );
    }

    private compareOtp(
        otp: string,
        hash: string,
    ) {
        return bcrypt.compare(otp, hash);
    }
}