import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersResolvers = {
    Query: {
      users: async () => await prisma.users.findMany(),
      userExists: async (
        _: unknown,
        { username, email, password}: { username: string; email: string; password: string}
      ) => {
        const hashedPassword = "hashed_" + password; // Replace this with real hashing
        const user = await prisma.users.findFirst({
          where: {
            AND: [
              { username: { equals: username} },
              { email: { equals: email } },
              { passwordHash: { equals: hashedPassword } }
            ]
          }
        })

        if (user != null)
          return true

        return false
      } 
    },
    Mutation: {
      createUser: async (
        _: unknown,
        { username, email, password }: { username: string; email: string; password: string }
    ) => {
        const hashedPassword = "hashed_" + password; // Replace this with real hashing

        return await prisma.users.create({
          data: {
            email,
            username,
            passwordHash: hashedPassword, 
          },
        });
      },
    },
  };
  
export default usersResolvers;