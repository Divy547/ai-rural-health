import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { DatabaseHealthResponseDto } from './dto/database-health-response.dto';
import { HealthResponseDto } from './dto/health-response.dto';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Application health check',
  })
  @ApiOkResponse({
    type: HealthResponseDto,
  })
  getHealth(): HealthResponseDto {
    return this.healthService.getHealth();
  }

  @Get('database')
  @ApiOperation({
    summary: 'Database health check',
  })
  @ApiOkResponse({
    type: DatabaseHealthResponseDto,
  })
  getDatabaseHealth(): Promise<DatabaseHealthResponseDto> {
    return this.healthService.getDatabaseHealth();
  }
}