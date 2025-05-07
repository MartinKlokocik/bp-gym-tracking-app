import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getAllPlannedWorkouts: async (_: unknown, { userId }: { userId: string }) => {
      return await prisma.plannedWorkout.findMany({
        where: { isDeleted: false, 
          OR: [
            { user: { id: userId } },
            { isDefault: true },
          ],
         },
        include: {
          days: {
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
                orderBy: {
                  exerciseNumber: "asc",
                },
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
      const { userId, name, schema, isActive, days } = input;

      const isAdmin = await prisma.user.findUnique({
        where: { id: userId },
        select: { isAdmin: true },
      });

      return await prisma.plannedWorkout.create({
        data: {
          user: {
            connect: { id: userId },
          },
          name,
          schema: schema || "",
          isActive,
          isPublic: false,
          isDefault: isAdmin ? true : false,
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
                  exerciseNumber: plannedExercise.exerciseNumber,
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

    deletePlannedWorkout: async (_: unknown, { id }: { id: string }) => {
      return await prisma.plannedWorkout.update({
        where: { id },
        data: { isDeleted: true },
      });
    },
  },
};

export default resolvers;
