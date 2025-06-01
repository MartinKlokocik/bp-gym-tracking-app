import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getWorkoutForToday: async (_: unknown, { userId }: { userId: string }) => {
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

    isDevicePaired: async (
      _: unknown,
      { deviceUUID }: { deviceUUID: string }
    ) => {
      console.log("deviceUUID", deviceUUID);

      const deviceRecord = await prisma.devicePairing.findFirst({
        where: {
          deviceUUID,
        },
      });

      if (deviceRecord && deviceRecord.isPaired) {
        return true;
      }

      if (deviceRecord) {
        return false;
      }

      await prisma.devicePairing.create({
        data: {
          deviceUUID,
          isPaired: false,
          userId: null,
        },
      });

      return false;
    },

    isUserPaired: async (_: unknown, { userId }: { userId: string }) => {
      const device = await prisma.devicePairing.findFirst({
        where: {
          userId,
          isPaired: true,
        },
      });

      return device ? true : false;
    },
  },
  Mutation: {
    sendPulseData: async (
      _: unknown,
      {
        avgPulse,
        exerciseIndex,
        setIndex,
      }: { avgPulse: number; exerciseIndex: number; setIndex: number }
    ) => {
      console.log("avgPulse", avgPulse);
      console.log("exerciseIndex", exerciseIndex);
      console.log("setIndex", setIndex);
      return true;
    },

    pairDevice: async (
      _: unknown,
      { deviceUUID, userId }: { deviceUUID: string; userId: string }
    ) => {
      console.log("deviceUUID", deviceUUID);
      console.log("userId", userId);

      const device = await prisma.devicePairing.findFirst({
        where: {
          deviceUUID,
          isDeleted: false,
          isPaired: false,
        },
      });

      if (device) {
        await prisma.devicePairing.update({
          where: { id: device.id },
          data: {
            isPaired: true,
            userId,
            updatedAt: new Date(),
          },
        });

        return true;
      }

      return false;
    },

    unpairUser: async (_: unknown, { userId }: { userId: string }) => {
      const device = await prisma.devicePairing.findFirst({
        where: {
          userId,
          isPaired: true,
        },
      });

      if (device) {
        await prisma.devicePairing.update({
          where: { id: device.id },
          data: { isPaired: false, updatedAt: new Date() },
        });
      }
      return true;
    },
  },
};

export default resolvers;
