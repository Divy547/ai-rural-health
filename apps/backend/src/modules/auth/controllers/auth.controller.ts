import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenService } from '../services/token.service';

import type { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SendOtpDto } from '../dto/send-otp.dto';
import { OtpService } from '../services/otp.service';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { AuthService } from '../services/auth.service';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly tokenService: TokenService,
        private readonly otpService: OtpService,
        private readonly authService: AuthService,
    ) { }

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
        return this.authService.sendOtp(dto.phone);
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






    // @Post("otp/send")
    // async sendOtp(
    //     @Body() dto: SendOtpDto,
    // ) {
    //     await this.otpService.sendOtp(dto.phone);

    //     return {
    //         success: true,
    //         message: "OTP sent successfully",
    //     };
    // }

    // @Post("otp/verify")
    // async verifyOtp(
    //     @Body() dto: VerifyOtpDto,
    // ) {
    //     const verified = await this.otpService.verifyOtp(
    //         dto.phone,
    //         dto.otp,
    //     );

    //     return {
    //         success: verified,
    //     };
    // }




    // @Get('test-token')
    // async testToken() {
    //     return this.tokenService.generateTokenPair({
    //         sub: 'test-user-id',
    //         role: Role.USER,
    //     });
    // }


    // @Get('verify-token')
    // async verifyToken() {
    //     const token = (
    //         await this.tokenService.generateAccessToken({
    //             sub: 'test-user-id',
    //             role: Role.USER,
    //         })
    //     );

    //     return this.tokenService.verifyAccessToken(token);
    // }


}