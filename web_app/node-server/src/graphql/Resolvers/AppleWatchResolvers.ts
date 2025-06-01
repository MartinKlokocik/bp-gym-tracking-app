import { PrismaClient, RecordStatus } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getWorkoutForToday: async (
      _: unknown,
      { deviceUUID }: { deviceUUID: string }
    ) => {
      console.log("getWorkoutForToday", deviceUUID);
      const userId = await prisma.devicePairing.findFirst({
        where: {
          deviceUUID,
          isPaired: true,
          isDeleted: false,
        },
        select: {
          userId: true,
        },
      });

      if (!userId || !userId.userId) {
        return null;
      }

      const today = new Date().toISOString().split("T")[0];

      const workout = await prisma.calendarDay.findFirst({
        where: {
          userId: userId.userId,
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
        exerciseId,
        deviceUUID,
        calendarDayId,
      }: {
        avgPulse: number;
        exerciseIndex: number;
        setIndex: number;
        exerciseId: string;
        deviceUUID: string;
        calendarDayId: string;
      }
    ) => {
      const exerciseRecord = await prisma.exerciseRecord.findFirst({
        where: {
          exerciseId,
          calendarDayId,
        },
        include: {
          recordSets: true,
        },
      });

      if (!exerciseRecord) {
        return false;
      }

      const recordSet = exerciseRecord.recordSets.find(
        (set) => set.setNumber === setIndex + 1
      );

      if (!recordSet) {
        return false;
      }

      await prisma.recordSet.update({
        where: { id: recordSet.id },
        data: {
          avgPulse: avgPulse,
        },
      });

      if (setIndex === exerciseRecord.recordSets.length - 1) {
        await prisma.exerciseRecord.update({
          where: { id: exerciseRecord.id },
          data: { status: RecordStatus.COMPLETED },
        });
      }

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
