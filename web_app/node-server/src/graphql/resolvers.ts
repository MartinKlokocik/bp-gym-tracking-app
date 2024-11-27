import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
    Query: {
      users: async () => await prisma.user.findMany(),
    },
    Mutation: {
      createUser: async (
        _: unknown,
        { username, email, password }: { username: string; email: string; password: string }
    ) => {
        const hashedPassword = "hashed_" + password; // Replace this with real hashing

        return await prisma.user.create({
          data: {
            email,
            username,
            passwordHash: hashedPassword, 
          },
        });
      },
    },
  };
  
export default resolvers;