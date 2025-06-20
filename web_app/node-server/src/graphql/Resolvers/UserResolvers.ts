import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface DecodedUser {
  userId: string;
  email: string;
}

export default {
  Query: {
    // Get the currently authenticated user
    me: async (_: any, __: any, { user }: { user: DecodedUser | null }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.user.findUnique({ where: { id: user.userId } });
    },
  },

  Mutation: {
    // User signup
    signup: async (
      _: any,
      {
        email,
        password,
        name,
      }: { email: string; password: string; name: string }
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("Email already registered");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      await prisma.userProfile.create({
        data: {
          userId: user.id,
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1],
        },
      });

      return user;
    },

    // User login
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });

      if (!user) throw new Error("Invalid email or password");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid email or password");

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return {
        token,
        user: {
          ...user,
          profilePicture: user.profile?.profilePicture || null,
        },
      };
    },
  },
};
