import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ENV } from "@/config/env";

/**
 * DynamoDB Client Configuration
 * Creates and exports a configured DynamoDB Document Client
 */

let dynamoDBClient: DynamoDBClient;
let docClient: DynamoDBDocumentClient;

/**
 * Initialize DynamoDB client with configuration
 */
const initializeDynamoDB = () => {
  // Base DynamoDB client configuration
  const clientConfig: any = {
    region: ENV.AWS_REGION || "us-east-1",
  };

  // Add credentials if provided (for development/testing)
  if (ENV.AWS_ACCESS_KEY_ID && ENV.AWS_SECRET_ACCESS_KEY) {
    clientConfig.credentials = {
      accessKeyId: ENV.AWS_ACCESS_KEY_ID,
      secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
    };
  }

  // Add custom endpoint for local development (LocalStack, DynamoDB Local)
  if (ENV.DYNAMODB_ENDPOINT) {
    clientConfig.endpoint = ENV.DYNAMODB_ENDPOINT;
  }

  dynamoDBClient = new DynamoDBClient(clientConfig);

  // Document client provides simpler API for working with items
  docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
    marshallOptions: {
      removeUndefinedValues: true, // Remove undefined values
      convertEmptyValues: false, // Don't convert empty strings to null
    },
    unmarshallOptions: {
      wrapNumbers: false, // Return numbers as native JavaScript numbers
    },
  });

  return docClient;
};

/**
 * Get or create DynamoDB Document Client singleton
 */
export const getDynamoDBClient = (): DynamoDBDocumentClient => {
  if (!docClient) {
    return initializeDynamoDB();
  }
  return docClient;
};

/**
 * Table names configuration
 */
export const DYNAMODB_TABLES = {
  USERS: ENV.DYNAMODB_USERS_TABLE || "users",
} as const;

/**
 * Graceful shutdown handler
 */
const handleShutdown = () => {
  if (dynamoDBClient) {
    console.log("Shutting down DynamoDB connection");
    dynamoDBClient.destroy();
  }
};

process.on("SIGTERM", handleShutdown);
process.on("SIGINT", handleShutdown);

// Export the document client
export default getDynamoDBClient();
