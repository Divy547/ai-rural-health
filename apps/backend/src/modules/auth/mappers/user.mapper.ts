import { User } from '@prisma/client';

import { UserProfileDto } from '../dto/user-profile.dto';

export class UserMapper {
  static toProfileDto(user: User): UserProfileDto {
    return {
      id: user.id,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      language: user.language ?? '',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}