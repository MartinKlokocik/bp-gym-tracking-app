import { ApolloServer } from "@apollo/server";
import {
  startStandaloneServer,
  StandaloneServerContextFunctionArgument,
} from "@apollo/server/standalone";
import { schema } from "../graphql";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

interface DecodedUser {
  userId: number;
  email: string;
}

// Function to authenticate a user from the token
const getUserFromToken = (token?: string): DecodedUser | null => {
  if (!token) return null;
  try {
    return jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET as string
    ) as DecodedUser;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  schema,
});

// Start server with context initialization
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }: StandaloneServerContextFunctionArgument) => {
      // Extract token correctly
      const token = req.headers["authorization"] || "";
      const user = getUserFromToken(token);

      return { prisma, user }; // Make `prisma` and `user` available in resolvers
    },
  });

  console.log(`🚀 Server ready at ${url}`);
})();
