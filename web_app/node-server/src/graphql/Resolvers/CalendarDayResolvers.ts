import { PrismaClient, RecordStatus } from "@prisma/client";

const prisma = new PrismaClient();

const deleteCalendarDay = async (id: string) => {
  try {
    const calendarDay = await prisma.calendarDay.findUnique({
      where: { id },
      include: { exerciseRecords: true },
    });

    if (!calendarDay) return false;

    await prisma.$transaction(async (tx) => {
      for (const record of calendarDay.exerciseRecords) {
        await tx.recordSet.deleteMany({
          where: { exerciseRecordId: record.id },
        });
      }

      await tx.exerciseRecord.deleteMany({
        where: { calendarDayId: id },
      });

      await tx.calendarDay.delete({
        where: { id },
      });
    });

    return true;
  } catch (error) {
    console.error("Error deleting calendar day:", error);
    return false;
  }
}

const resolvers = {
  Query: {
    getCalendarDayByDate: async (_: unknown, { date }: { date: string }) => {
      const calendarDay = await prisma.calendarDay.findFirst({
        where: { date: date.split("T")[0] },
        include: {
          plannedWorkoutDay: {
            include: {
              plannedExercises: {
                include: {
                  plannedSets: true,
                  exercise: true,
                },
              },
            },
          },
        },
      });

      if (!calendarDay) {
        return null;
      }

      return calendarDay;
    },
  },
  Mutation: {
    createCalendarDay: async (_: unknown, { input }: { input: any }) => {
      const { userId, date, plannedWorkoutDay } = input

      const existingCalendarDay = await prisma.calendarDay.findFirst({
        where: {
          user: { id: userId },
          date: date.split("T")[0],
        },
      });

      if (existingCalendarDay) {
        await deleteCalendarDay(existingCalendarDay.id);
      }

      return await prisma.calendarDay.create({
        data: {
          user: {
            connect: { id: userId },
          },
          date: date.split("T")[0],
          plannedWorkoutDay: {
            connect: { id: plannedWorkoutDay.id },
          },
          exerciseRecords: {
            create: plannedWorkoutDay.plannedExercises.map(
              (plannedExercise: any) => ({
                user: {
                  connect: { id: userId },
                },
                status: RecordStatus.PENDING,
                date: date.split("T")[0],
                exercise: {
                  connect: { id: plannedExercise.exerciseId },
                },
                recordSets: {
                  create: plannedExercise.plannedSets.map((set: any) => ({
                    setNumber: set.setNumber,
                    reps: set.reps,
                    restTime: set.restTime || null,
                    weight: set.weight || 0,
                  })),
                },
              })
            ),
          },
        },
        include: {
          plannedWorkoutDay: {
            include: {
              plannedExercises: {
                include: {
                  plannedSets: true,
                  exercise: true,
                },
              },
            },
          },
          exerciseRecords: {
            include: {
              exercise: true,
              recordSets: true,
            },
          },
        },
      });
    },
    deleteCalendarDay: async (_: unknown, { date }: { date: string }) => {
      const calendarDay = await prisma.calendarDay.findFirst({
        where: { date: date.split("T")[0] },
      });

      if (!calendarDay) return false;

      return await deleteCalendarDay(calendarDay.id);
    },
  },
};

export default resolvers;
