import { ApiProperty } from '@nestjs/swagger';

import { UserProfileDto } from './user-profile.dto';

export class AuthResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  isNewUser!: boolean;

  @ApiProperty({
    type: UserProfileDto,
  })
  user!: UserProfileDto;
}