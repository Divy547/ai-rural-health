import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    example: 'ok',
  })
  status!: string;

  @ApiProperty({
    example: '2026-08-07T18:30:00.000Z',
  })
  timestamp!: string;

  @ApiProperty({
    example: 123.45,
  })
  uptime!: number;

  @ApiProperty({
    example: 'development',
  })
  environment!: string;
}