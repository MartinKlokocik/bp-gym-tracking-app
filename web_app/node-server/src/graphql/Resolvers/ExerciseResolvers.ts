import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exerciseResolvers = {
  Query: {
    getAllExercises: async (_: unknown, { userId }: { userId: string }) =>
      await prisma.exercise.findMany({
        where: {
          OR: [{ isDefault: true }, { userId: userId }],
        },
      }),
    getExerciseById: async (_: unknown, { id }: { id: string }) =>
      await prisma.exercise.findUnique({ where: { id: id } }),
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
        userId: string;
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
      return await prisma.exercise.create({
        data: {
          userId,
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
