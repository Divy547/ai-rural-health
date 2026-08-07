import { ApiProperty } from '@nestjs/swagger';

export class DatabaseHealthResponseDto {
  @ApiProperty({
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    example: 'connected',
  })
  database!: string;

  @ApiProperty({
    example: '2026-08-07T18:30:00.000Z',
  })
  timestamp!: string;
}
