import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Mutation: {
    createCalendarDay: async (_: unknown, { input }: { input: any }) => {
      const { userId, date, plannedWorkoutDayId } = input;

      return await prisma.calendarDay.create({
        data: {
          user: {
            connect: { id: userId },
          },
          date,
          plannedWorkoutDay: {
            connect: { id: plannedWorkoutDayId },
          },
        },
      });
    },
  },
};

export default resolvers;
