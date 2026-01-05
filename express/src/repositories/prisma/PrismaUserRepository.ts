import { PrismaClient } from "@prisma/client";
import {
  IUserRepository,
  UserData,
  CreateUserInput,
  UpdateUserInput,
  PaginationOptions,
  UserSelectOptions,
} from "../interfaces/IUserRepository";

/**
 * Prisma implementation of IUserRepository
 * Handles all user-related database operations using Prisma ORM
 */
export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async findMany(options: PaginationOptions): Promise<Partial<UserData>[]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.prisma.user.findMany({
      take: limit,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Partial<UserData>[];
  }

  async findById(id: string, select?: UserSelectOptions): Promise<Partial<UserData> | null> {
    const selectOptions = select || {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    };

    return await this.prisma.user.findUnique({
      where: { id },
      select: selectOptions,
    }) as Partial<UserData> | null;
  }

  async findByEmail(email: string): Promise<UserData | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    }) as UserData | null;
  }

  async findByEmailVerificationToken(token: string): Promise<UserData | null> {
    return await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date(),
        },
        emailVerified: null,
      },
    }) as UserData | null;
  }

  async findByPasswordResetToken(token: string): Promise<UserData | null> {
    return await this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    }) as UserData | null;
  }

  async findByRefreshToken(userId: string, refreshToken: string): Promise<UserData | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
        refreshToken: refreshToken,
      },
    }) as UserData | null;
  }

  async create(data: CreateUserInput): Promise<Partial<UserData>> {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Partial<UserData>;
  }

  async update(id: string, data: UpdateUserInput): Promise<Partial<UserData>> {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Partial<UserData>;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateMany(where: Partial<UserData>, data: UpdateUserInput): Promise<number> {
    const result = await this.prisma.user.updateMany({
      where: this.buildWhereClause(where),
      data,
    });
    return result.count;
  }

  /**
   * Helper method to build Prisma where clause from partial UserData
   */
  private buildWhereClause(where: Partial<UserData>) {
    const clause: any = {};

    if (where.emailVerificationExpires) {
      clause.emailVerificationExpires = {
        lt: where.emailVerificationExpires,
      };
    }

    if (where.emailVerified === null) {
      clause.emailVerified = null;
    }

    return clause;
  }
}
