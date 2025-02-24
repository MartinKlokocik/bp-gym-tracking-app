import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exerciseRecordsResolvers = {
  Query: {
    getAllUserExerciseRecordsForExercise: async (
      _: unknown,
      { exerciseId, userId }: { exerciseId: string; userId: string }
    ) =>
      await prisma.exerciseRecord.findMany({
        where: { exerciseId: exerciseId, userId: userId, status: "COMPLETED" },
        include: {
            recordSets: true,
            calendarDay: true
        }
      }),
  },
};

export default exerciseRecordsResolvers;
