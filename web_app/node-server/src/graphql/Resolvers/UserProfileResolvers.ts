import { PrismaClient, UserProfile } from "@prisma/client";

const prisma = new PrismaClient();

const userProfileResolvers = {
  Query: {
    getUserProfile: async (_: unknown, { userId }: { userId: string }) => {
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });
      return userProfile;
    },
  },
  Mutation: {
    updateUserProfile: async (
      _: unknown,
      { userId, data }: { userId: string; data: UserProfile }
    ) => {
      const existingProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (existingProfile) {
        return await prisma.userProfile.update({
          where: { userId },
          data,
        });
      } else {
        return await prisma.userProfile.create({
          data: {
            ...data,
            userId,
          },
        });
      }
    },
  },
};

export default userProfileResolvers;
