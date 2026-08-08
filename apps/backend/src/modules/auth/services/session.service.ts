import { Injectable } from '@nestjs/common';
import type { RefreshToken } from '@prisma/client';

import { InvalidRefreshTokenException, SessionExpiredException } from '../exceptions';
import { SessionRepository } from '../repositories/session.repository';
import type {
    CreateSessionOptions,
    ValidateSessionResult,
} from '../types/session.types';
import type { TokenPair } from '../types';
import { TokenService } from './token.service';

@Injectable()
export class SessionService {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly tokenService: TokenService,
    ) { }

    async create({
        userId,
        refreshToken,
    }: CreateSessionOptions): Promise<void> {
        const tokenHash =
            await this.tokenService.hashRefreshToken(
                refreshToken,
            );

        await this.sessionRepository.create({
            userId,
            tokenHash,
            expiresAt:
                this.tokenService.getRefreshTokenExpiryDate(),
        });
    }

    async validate(
        refreshToken: string,
    ): Promise<ValidateSessionResult> {
        const payload =
            await this.tokenService.verifyRefreshToken(
                refreshToken,
            );

        const sessions =
            await this.sessionRepository.findActiveByUserId(
                payload.sub,
            );

        const session =
            await this.findMatchingSession(
                refreshToken,
                sessions,
            );

        if (!session) {
            throw new InvalidRefreshTokenException();
        }

        if (session.expiresAt <= new Date()) {
            throw new SessionExpiredException();
        }

        return {
            session,
            payload,
        };
    }

    async rotate(
        refreshToken: string,
    ): Promise<TokenPair> {
        const { session, payload } =
            await this.validate(refreshToken);

        const tokens =
            await this.tokenService.generateTokenPair({
                sub: payload.sub,
                role: payload.role,
            });

        await this.sessionRepository.revoke(
            session.id,
        );

        await this.create({
            userId: payload.sub,
            refreshToken: tokens.refreshToken,
        });

        return tokens;
    }

    async revoke(
        refreshToken: string,
    ): Promise<void> {
        const { session } =
            await this.validate(refreshToken);

        await this.sessionRepository.revoke(
            session.id,
        );
    }

    private async findMatchingSession(
        refreshToken: string,
        sessions: RefreshToken[],
    ): Promise<RefreshToken | null> {
        for (const session of sessions) {
            const isMatch =
                await this.tokenService.compareRefreshToken(
                    refreshToken,
                    session.tokenHash,
                );

            if (isMatch) {
                return session;
            }
        }

        return null;
    }
}