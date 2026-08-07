import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserProfileDto {
  @ApiProperty({
    example: 'cmf7r6c0k0000l504x9s2t8m',
  })
  id!: string;

  @ApiProperty({
    example: '+919876543210',
  })
  phone!: string;

  @ApiProperty({
    example: 'Divy Akash Gupta',
    nullable: true,
  })
  fullName!: string | null;

  @ApiProperty({
    enum: Role,
    example: Role.USER,
  })
  role!: Role;

  @ApiProperty({
    example: 'en',
  })
  language!: string;

  @ApiProperty({
    example: '2026-08-08T10:30:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-08-08T10:30:00.000Z',
  })
  updatedAt!: Date;
}