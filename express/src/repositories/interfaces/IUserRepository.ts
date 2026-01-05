export interface UserData {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  refreshToken?: string | null;
  role: 'ADMIN' | 'USER';
  emailVerified?: Date | null;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'USER';
  refreshToken?: string | null;
  emailVerified?: Date | null;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  image?: string | null;
}

export interface UserSelectOptions {
  id?: boolean;
  name?: boolean;
  email?: boolean;
  password?: boolean;
  role?: boolean;
  emailVerified?: boolean;
  refreshToken?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

/**
 * Repository interface for User operations
 * This abstraction allows multiple database implementations (Prisma, DynamoDB, etc.)
 */
export interface IUserRepository {
  /**
   * Find all users with pagination
   */
  findMany(options: PaginationOptions): Promise<Partial<UserData>[]>;

  /**
   * Find user by ID
   */
  findById(id: string, select?: UserSelectOptions): Promise<Partial<UserData> | null>;

  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<UserData | null>;

  /**
   * Find user by email verification token
   */
  findByEmailVerificationToken(token: string): Promise<UserData | null>;

  /**
   * Find user by password reset token
   */
  findByPasswordResetToken(token: string): Promise<UserData | null>;

  /**
   * Find user by refresh token
   */
  findByRefreshToken(userId: string, refreshToken: string): Promise<UserData | null>;

  /**
   * Create a new user
   */
  create(data: CreateUserInput): Promise<Partial<UserData>>;

  /**
   * Update user by ID
   */
  update(id: string, data: UpdateUserInput): Promise<Partial<UserData>>;

  /**
   * Delete user by ID
   */
  delete(id: string): Promise<void>;

  /**
   * Update many users that match criteria
   */
  updateMany(where: Partial<UserData>, data: UpdateUserInput): Promise<number>;
}
