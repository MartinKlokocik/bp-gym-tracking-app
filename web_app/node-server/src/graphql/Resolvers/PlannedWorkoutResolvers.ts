import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getAllPlannedWorkouts: async () => {
      return await prisma.plannedWorkout.findMany({
        include: {
          days: {
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
    },
    getWorkoutPlanById: async (_: unknown, { id }: { id: string }) => {
      return await prisma.plannedWorkout.findUnique({
        where: { id },
        include: {
          days: {
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
    },
  },

  Mutation: {
    createPlannedWorkout: async (_: unknown, { input }: { input: any }) => {
      const { userId, name, schema, isActive, isPublic, days } = input;

      console.log(input);

      return await prisma.plannedWorkout.create({
        data: {
          user: {
            connect: { id: userId },
          },
          name,
          schema: schema || "",
          isActive,
          isPublic,
          days: {
            create: days.map((day: any) => ({
              user: {
                connect: { id: day.userId },
              },
              name: day.name,
              plannedExercises: {
                create: day.plannedExercises.map((plannedExercise: any) => ({
                  user: {
                    connect: { id: plannedExercise.userId },
                  },
                  exercise: {
                    connect: { id: plannedExercise.exerciseId },
                  },
                  notes: plannedExercise.notes || "",
                  plannedSets: {
                    create: plannedExercise.plannedSets.map((set: any) => ({
                      setNumber: set.setNumber,
                      reps: set.reps,
                      restTime: set.restTime || null,
                    })),
                  },
                })),
              },
            })),
          },
        },
        include: {
          days: {
            include: {
              plannedExercises: {
                include: {
                  plannedSets: true,
                },
              },
            },
          },
        },
      });
    },
  },
};

export default resolvers;
