import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exercisesResolvers = {
    Query: {
      Exercises: async () => await prisma.exercises.findMany()
    },
    Mutation: {
      createExercise: async (
        _: unknown,
        { name, description, musclesTargeted, equipmentRequired }: { name: string; description: string; musclesTargeted: string; equipmentRequired: string }
    ) => {
        return await prisma.exercises.create({
          data: {
            name,
            description,
            musclesTargeted, 
            equipmentRequired,
            isCustom: true
          },
        });
      },
    },
  };
  
export default exercisesResolvers;