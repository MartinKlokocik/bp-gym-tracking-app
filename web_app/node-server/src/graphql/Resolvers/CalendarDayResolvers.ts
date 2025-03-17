import { PrismaClient, RecordStatus } from "@prisma/client";

const prisma = new PrismaClient();

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
      const { userId, date, plannedWorkoutDay } = input;

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
  },
};

export default resolvers;
