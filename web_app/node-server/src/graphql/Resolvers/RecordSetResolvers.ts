import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const recordSetResolvers = {
  Mutation: {
    updateWeightInSetRecord: async (
      _: unknown,
      { setId, weight }: { setId: string; weight: number }
    ) => {
      return await prisma.recordSet.update({
        where: { id: setId },
        data: { weight },
      });
    },
    updateRepsInSetRecord: async (
      _: unknown,
      { setId, reps }: { setId: string; reps: number }
    ) => {
      return await prisma.recordSet.update({
        where: { id: setId },
        data: { reps },
      });
    },
  },
};

export default recordSetResolvers;
