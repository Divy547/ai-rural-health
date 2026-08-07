import { Injectable } from '@nestjs/common';
import { Otp, OtpPurpose, Prisma } from '@prisma/client';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class OtpRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(data: {
        phone: string;
        codeHash: string;
        purpose?: OtpPurpose;
        expiresAt: Date;
    }): Promise<Otp> {
        return this.prisma.otp.create({
            data: {
                phone: data.phone,
                codeHash: data.codeHash,
                purpose: data.purpose ?? OtpPurpose.LOGIN,
                expiresAt: data.expiresAt,
            },
        });
    }

    async findLatest(
        phone: string,
        purpose: OtpPurpose = OtpPurpose.LOGIN,
    ): Promise<Otp | null> {
        return this.prisma.otp.findFirst({
            where: {
                phone,
                purpose,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async delete(id: string): Promise<Otp> {
        return this.prisma.otp.delete({
            where: { id },
        });
    }

    async deleteByPhone(
        phone: string,
        purpose: OtpPurpose = OtpPurpose.LOGIN,
    ): Promise<Prisma.BatchPayload> {
        return this.prisma.otp.deleteMany({
            where: {
                phone,
                purpose,
            },
        });
    }

    async deleteExpired(): Promise<Prisma.BatchPayload> {
        return this.prisma.otp.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
    }

    async exists(
        phone: string,
        purpose: OtpPurpose = OtpPurpose.LOGIN,
    ): Promise<boolean> {
        const count = await this.prisma.otp.count({
            where: {
                phone,
                purpose,
            },
        });

        return count > 0;
    }
}