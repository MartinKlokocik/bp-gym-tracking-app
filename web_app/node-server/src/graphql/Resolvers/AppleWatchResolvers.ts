import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getWorkoutForToday: async (
      _: unknown,
      { userId }: { userId: string }
    ) => {
      const today = new Date(2025, 3, 26).toISOString().split("T")[0];
      console.log(userId);

      const workout = await prisma.calendarDay.findFirst({
        where: {
          userId,
          date: today,
        },
        select: {
          id: true,
          plannedWorkoutDay: {
            select: {
              name: true,
              plannedExercises: {
                orderBy: {
                  exerciseNumber: "asc",
                },
                select: {
                  exercise: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  plannedSets: {
                    orderBy: {
                      setNumber: "asc",
                    },
                    select: {
                      reps: true,
                      restTime: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      console.log(JSON.stringify(workout, null, 2));

      return workout ?? null;
    },
  },
  Mutation: {
    sendPulseData: async (_: unknown, { pulseData }: { pulseData: number }) => {
      console.log(pulseData);
      return true;
    },
  },
};

export default resolvers;
