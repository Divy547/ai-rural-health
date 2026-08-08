import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(
    id: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByPhone(
    phone: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByGoogleId(
    googleId: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { googleId },
    });
  }

  async create(data: {
    phone?: string;
    email?: string;
    googleId?: string;
    fullName?: string;
    role?: Role;
    language?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        phone: data.phone,
        email: data.email,
        googleId: data.googleId,
        fullName: data.fullName,
        role: data.role ?? Role.USER,
        language: data.language ?? 'en',
      },
    });
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async existsByPhone(
    phone: string,
  ): Promise<boolean> {
    const count =
      await this.prisma.user.count({
        where: { phone },
      });

    return count > 0;
  }
}