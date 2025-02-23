import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getCalendarDayByDate: async (_: unknown, { date }: { date: string }) => {
      const calendarDay = await prisma.calendarDay.findFirst({
        where: { date: date.split('T')[0] },
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
      })

      if (!calendarDay) {
        return null;
      }

      return calendarDay;
    },
  },
  Mutation: {
    createCalendarDay: async (_: unknown, { input }: { input: any }) => {
      const { userId, date, plannedWorkoutDayId } = input;

      return await prisma.calendarDay.create({
        data: {
          user: {
            connect: { id: userId },
          },
          date: date.split('T')[0],
          plannedWorkoutDay: {
            connect: { id: plannedWorkoutDayId },
          },
        },
      });
    },
  },
};

export default resolvers;
