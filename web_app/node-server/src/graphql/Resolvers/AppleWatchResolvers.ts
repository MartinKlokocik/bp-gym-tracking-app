import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getWorkoutForToday: async (
      _: unknown,
      { userId }: { userId: string }
    ) => {
      const today = new Date().toISOString().split("T")[0];

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
    sendPulseData: async (
      _: unknown,
      { avgPulse, exerciseIndex, setIndex }: { avgPulse: number; exerciseIndex: number; setIndex: number }
    ) => {
      console.log("avgPulse", avgPulse);
      console.log("exerciseIndex", exerciseIndex);
      console.log("setIndex", setIndex);
      return true;
    },
  },
};

export default resolvers;
