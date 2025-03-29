import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getWorkoutDayById: async (_: unknown, { id }: { id: string }) => {
      return await prisma.plannedWorkoutDay.findUnique({
        where: { id },
        include: {
          plannedExercises: {
            orderBy: {
              exerciseNumber: "asc",
            },
            include: {
              plannedSets: true,
              exercise: true,
            },
          },
        },
      });
    },
  },
};

export default resolvers;
