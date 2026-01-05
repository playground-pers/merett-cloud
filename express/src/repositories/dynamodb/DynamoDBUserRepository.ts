import {
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import {
  IUserRepository,
  UserData,
  CreateUserInput,
  UpdateUserInput,
  PaginationOptions,
  UserSelectOptions,
} from "../interfaces/IUserRepository";
import { getDynamoDBClient, DYNAMODB_TABLES } from "@/config/dynamodb";

/**
 * DynamoDB implementation of IUserRepository
 * Handles all user-related database operations using AWS DynamoDB
 */
export class DynamoDBUserRepository implements IUserRepository {
  private readonly tableName = DYNAMODB_TABLES.USERS;
  private readonly client = getDynamoDBClient();

  /**
   * Find all users with pagination
   */
  async findMany(options: PaginationOptions): Promise<Partial<UserData>[]> {
    const { page = 1, limit = 10 } = options;

    const command = new ScanCommand({
      TableName: this.tableName,
      Limit: limit,
      ProjectionExpression: "id, #name, email, #role, createdAt, updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
        "#role": "role",
      },
    });

    const result = await this.client.send(command);
    const items = (result.Items || []) as Partial<UserData>[];

    // Convert DynamoDB date strings back to Date objects
    return items.map(this.deserializeUser);
  }

  /**
   * Find user by ID
   */
  async findById(id: string, select?: UserSelectOptions): Promise<Partial<UserData> | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
      ProjectionExpression: this.buildProjectionExpression(select),
      ExpressionAttributeNames: this.buildExpressionAttributeNames(select),
    });

    const result = await this.client.send(command);
    
    if (!result.Item) {
      return null;
    }

    return this.deserializeUser(result.Item as Partial<UserData>);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<UserData | null> {
    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    });

    const result = await this.client.send(command);
    
    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    return this.deserializeUser(result.Items[0]) as UserData;
  }

  /**
   * Find user by email verification token
   */
  async findByEmailVerificationToken(token: string): Promise<UserData | null> {
    const now = new Date().toISOString();

    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression:
        "emailVerificationToken = :token AND emailVerificationExpires > :now AND attribute_not_exists(emailVerified)",
      ExpressionAttributeValues: {
        ":token": token,
        ":now": now,
      },
    });

    const result = await this.client.send(command);
    
    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    return this.deserializeUser(result.Items[0]) as UserData;
  }

  /**
   * Find user by password reset token
   */
  async findByPasswordResetToken(token: string): Promise<UserData | null> {
    const now = new Date().toISOString();

    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression:
        "passwordResetToken = :token AND passwordResetExpires > :now",
      ExpressionAttributeValues: {
        ":token": token,
        ":now": now,
      },
    });

    const result = await this.client.send(command);
    
    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    return this.deserializeUser(result.Items[0]) as UserData;
  }

  /**
   * Find user by refresh token
   */
  async findByRefreshToken(userId: string, refreshToken: string): Promise<UserData | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id: userId },
    });

    const result = await this.client.send(command);
    
    if (!result.Item || result.Item.refreshToken !== refreshToken) {
      return null;
    }

    return this.deserializeUser(result.Item) as UserData;
  }

  /**
   * Create a new user
   */
  async create(data: CreateUserInput): Promise<Partial<UserData>> {
    const now = new Date();
    const user: UserData = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || "USER",
      emailVerificationToken: data.emailVerificationToken || null,
      emailVerificationExpires: data.emailVerificationExpires || null,
      emailVerified: null,
      refreshToken: null,
      passwordResetToken: null,
      passwordResetExpires: null,
      image: null,
      createdAt: now,
      updatedAt: now,
    };

    const serializedUser = this.serializeUser(user);

    const command = new PutCommand({
      TableName: this.tableName,
      Item: serializedUser,
    });

    await this.client.send(command);

    // Return only selected fields
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Update user by ID
   */
  async update(id: string, data: UpdateUserInput): Promise<Partial<UserData>> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    // Build update expression dynamically
    Object.entries(data).forEach(([key, value]) => {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;
      
      updateExpressions.push(`${attributeName} = ${attributeValue}`);
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = value;
    });

    // Always update updatedAt
    updateExpressions.push("#updatedAt = :updatedAt");
    expressionAttributeNames["#updatedAt"] = "updatedAt";
    expressionAttributeValues[":updatedAt"] = new Date().toISOString();

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const result = await this.client.send(command);
    
    if (!result.Attributes) {
      throw new Error("Failed to update user");
    }

    const updatedUser = this.deserializeUser(result.Attributes as Partial<UserData>);

    // Return only selected fields
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }

  /**
   * Delete user by ID
   */
  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });

    await this.client.send(command);
  }

  /**
   * Update many users that match criteria
   */
  async updateMany(where: Partial<UserData>, data: UpdateUserInput): Promise<number> {
    // First, find all users matching the criteria
    const filterExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};

    if (where.emailVerificationExpires) {
      filterExpressions.push("emailVerificationExpires < :expiry");
      expressionAttributeValues[":expiry"] = where.emailVerificationExpires.toISOString();
    }

    if (where.emailVerified === null) {
      filterExpressions.push("attribute_not_exists(emailVerified)");
    }

    const scanCommand = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: filterExpressions.join(" AND "),
      ExpressionAttributeValues: Object.keys(expressionAttributeValues).length > 0 
        ? expressionAttributeValues 
        : undefined,
      ProjectionExpression: "id",
    });

    const scanResult = await this.client.send(scanCommand);
    const items = scanResult.Items || [];

    // Update each matching user
    let updateCount = 0;
    for (const item of items) {
      try {
        await this.update(item.id, data);
        updateCount++;
      } catch (error) {
        console.error(`Failed to update user ${item.id}:`, error);
      }
    }

    return updateCount;
  }

  /**
   * Build projection expression from select options
   */
  private buildProjectionExpression(select?: UserSelectOptions): string | undefined {
    if (!select) {
      return "id, #name, email, #role, createdAt, updatedAt";
    }

    const fields = Object.entries(select)
      .filter(([_, include]) => include)
      .map(([field]) => {
        // Handle reserved words
        if (["name", "role"].includes(field)) {
          return `#${field}`;
        }
        return field;
      });

    return fields.length > 0 ? fields.join(", ") : undefined;
  }

  /**
   * Build expression attribute names for reserved words
   */
  private buildExpressionAttributeNames(select?: UserSelectOptions): Record<string, string> | undefined {
    const names: Record<string, string> = {};
    
    if (!select || select.name) {
      names["#name"] = "name";
    }
    
    if (!select || select.role) {
      names["#role"] = "role";
    }

    return Object.keys(names).length > 0 ? names : undefined;
  }

  /**
   * Serialize user data for DynamoDB (convert Date to ISO string)
   */
  private serializeUser(user: Partial<UserData>): any {
    const serialized: any = { ...user };

    if (user.createdAt instanceof Date) {
      serialized.createdAt = user.createdAt.toISOString();
    }
    if (user.updatedAt instanceof Date) {
      serialized.updatedAt = user.updatedAt.toISOString();
    }
    if (user.emailVerified instanceof Date) {
      serialized.emailVerified = user.emailVerified.toISOString();
    }
    if (user.emailVerificationExpires instanceof Date) {
      serialized.emailVerificationExpires = user.emailVerificationExpires.toISOString();
    }
    if (user.passwordResetExpires instanceof Date) {
      serialized.passwordResetExpires = user.passwordResetExpires.toISOString();
    }

    return serialized;
  }

  /**
   * Deserialize user data from DynamoDB (convert ISO string to Date)
   */
  private deserializeUser(item: any): Partial<UserData> {
    const user: any = { ...item };

    if (typeof item.createdAt === "string") {
      user.createdAt = new Date(item.createdAt);
    }
    if (typeof item.updatedAt === "string") {
      user.updatedAt = new Date(item.updatedAt);
    }
    if (typeof item.emailVerified === "string") {
      user.emailVerified = new Date(item.emailVerified);
    }
    if (typeof item.emailVerificationExpires === "string") {
      user.emailVerificationExpires = new Date(item.emailVerificationExpires);
    }
    if (typeof item.passwordResetExpires === "string") {
      user.passwordResetExpires = new Date(item.passwordResetExpires);
    }

    return user;
  }
}
