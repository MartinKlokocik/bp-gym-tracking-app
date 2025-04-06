import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getDataForAppleWatch: async () => {
      return {
        steps: 10000,
      }
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
