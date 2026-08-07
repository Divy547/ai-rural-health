import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import { DatabaseHealthResponseDto } from './dto/database-health-response.dto';
import { HealthResponseDto } from './dto/health-response.dto';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  getHealth(): HealthResponseDto {
    return {
      success: true,
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV ?? 'development',
    };
  }

  async getDatabaseHealth(): Promise<DatabaseHealthResponseDto> {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      success: true,
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
  }
}