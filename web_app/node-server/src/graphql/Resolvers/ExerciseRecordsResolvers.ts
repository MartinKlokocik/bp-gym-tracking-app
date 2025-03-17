import { PrismaClient, RecordStatus } from "@prisma/client";

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
        },
      }),

    getLatestExerciseRecord: async (
      _: unknown,
      {
        exerciseId,
        userId,
        date,
      }: { exerciseId: string; userId: string; date: string }
    ) =>
      await prisma.exerciseRecord.findFirst({
        where: {
          exerciseId: exerciseId,
          userId: userId,
          status: "COMPLETED",
          date: { lt: date },
        },
        orderBy: { date: "desc" },
        include: {
          recordSets: {
            orderBy: {
              setNumber: "asc",
            },
          },
        },
      }),

    getRecordForThisExerciseAndDate: async (
      _: unknown,
      {
        exerciseId,
        date,
        userId,
      }: { exerciseId: string; date: string; userId: string }
    ) =>
      await prisma.exerciseRecord.findFirst({
        where: { exerciseId: exerciseId, date: date, userId: userId },
        include: {
          recordSets: {
            orderBy: {
              setNumber: "asc",
            },
          },
        },
      }),
  },
  Mutation: {
    updateExerciseRecordStatus: async (
      _: unknown,
      { id, status }: { id: string; status: RecordStatus }
    ) =>
      await prisma.exerciseRecord.update({
        where: { id: id },
        data: { status: status },
      }),
  },
};

export default exerciseRecordsResolvers;
