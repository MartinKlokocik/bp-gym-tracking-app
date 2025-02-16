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
        muscleGroup,
        equipment,
        image,
        isPublic,
        isDefault,
      }: {
        userId: number | string;
        name: string;
        description: string;
        muscleGroup: string;
        equipment: string[];
        image?: string;
        isPublic?: boolean;
        isDefault?: boolean;
      }
    ) => {
      const numericUserId =
        typeof userId === "string" ? parseInt(userId, 10) : userId;

      return await prisma.exercise.create({
        data: {
          userId: numericUserId,
          name,
          description,
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
