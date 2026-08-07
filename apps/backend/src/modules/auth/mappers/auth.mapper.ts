import { AuthResponseDto } from '../dto/auth-response.dto';
import { User } from '@prisma/client';
import { UserMapper } from './user.mapper';

export class AuthMapper {
  static toAuthResponse(
    accessToken: string,
    refreshToken: string,
    isNewUser: boolean,
    user: User,
  ): AuthResponseDto {
    return {
      accessToken,
      refreshToken,
      isNewUser,
      user: UserMapper.toProfileDto(user),
    };
  }
}