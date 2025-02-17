import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exerciseResolvers = {
  Query: {
    getAllExercises: async () => await prisma.exercise.findMany(),
  },
  Mutation: {
    createExercise: async (
      _: unknown,
      {
        userId,
        name,
        description,
        type,
        muscleGroup,
        equipment,  
        image,
        isPublic,
        isDefault,
      }: {
        userId: number | string;
        name: string;
        description: string;
        type: string;
        muscleGroup: string;
        equipment?: string[];
        image?: string;
        isPublic?: boolean;
        isDefault?: boolean;
      }
    ) => {
      const numericUserId =
        typeof userId === "string" ? parseInt(userId, 10) : userId;

      console.log("userId", numericUserId);
      console.log("typeof numericUserId", typeof numericUserId);

      return await prisma.exercise.create({
        data: {
          userId: numericUserId,
          name,
          description,
          type,
          muscleGroup,
          equipment,
          image,
          isPublic,
          isDefault,
        },
      });
    },
  },
};

export default exerciseResolvers;
