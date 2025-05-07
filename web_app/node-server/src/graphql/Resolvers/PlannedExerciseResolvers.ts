import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plannedExerciseResolvers = {
  Mutation: {
    updatePlannedExerciseNotes: async (
      _: unknown,
      { id, notes }: { id: string; notes: string }
    ) => {
      return await prisma.plannedExercise.update({
        where: { id },
        data: { notes },
      });
    },
  },
};

export default plannedExerciseResolvers;
