import { Calendars, PlanExercises, PrismaClient, Users } from "@prisma/client";

const prisma = new PrismaClient();

const trainingPlansResolvers = {
    Query: {
      TrainingPlans: async () => await prisma.trainingPlans.findMany()
    },
    Mutation: {
      CreateTrainingPlan: async (
        _: unknown,
        { name, description, isPublic, user, planExercises, calendars }: { name: string; description: string; isPublic: boolean; user: Users; planExercises: PlanExercises[]; calendars: Calendars[]}
    ) => {
        return await prisma.trainingPlans.create({
          data: {
            name,
            description,
            isPublic, 
            user: {
                connect: { id: user.id },
            },
            planExercises: {
                create: planExercises.map((exercise) => ({
                    exerciseId: exercise.exerciseId,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weight: exercise.weight,
                    restTimeSeconds: exercise.restTimeSeconds,
                  })),
            },
            calendars: {
                create: calendars.map((calendar) => ({
                    date: calendar.date,
                    notes: calendar.notes,
                }))
            }
          }
        });
      },
    },
  };
  
export default trainingPlansResolvers;