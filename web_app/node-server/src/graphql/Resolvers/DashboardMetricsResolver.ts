import { PrismaClient, RecordStatus } from "@prisma/client";
import { subDays } from "date-fns";

const prisma = new PrismaClient();

const getLast7DaysConsistency = async (userId: string) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const calendarDays = await prisma.calendarDay.findMany({
    where: {
      userId,
      date: {
        gte: sevenDaysAgo.toISOString().split("T")[0],
        lte: today.toISOString().split("T")[0],
      },
      exerciseRecords: {
        some: {
          status: RecordStatus.COMPLETED,
        },
      },
    },
  });

  return calendarDays.length;
};

const getVolumeLiftedInWeeks = async (userId: string) => {
  const today = new Date();
  const completedExerciseRecords = await prisma.exerciseRecord.findMany({
    where: {
      userId,
      status: RecordStatus.COMPLETED,
      date: { lte: today.toISOString().split("T")[0] },
    },
    include: {
      recordSets: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const weeklyVolumes = new Map();

  completedExerciseRecords.forEach((record) => {
    const recordDate = new Date(record.date);
    const weekStart = new Date(recordDate);
    weekStart.setDate(recordDate.getDate() - recordDate.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekKey = weekStart.toISOString().split("T")[0];

    const recordVolume = record.recordSets.reduce((setAcc, set) => {
      return setAcc + set.weight * set.reps;
    }, 0);

    if (!weeklyVolumes.has(weekKey)) {
      weeklyVolumes.set(weekKey, {
        volume: 0,
        dateFrom: weekStart.toISOString().split("T")[0],
        dateTo: weekEnd.toISOString().split("T")[0],
      });
    }

    const week = weeklyVolumes.get(weekKey);
    week.volume += recordVolume;
  });

  const sortedWeeks = Array.from(weeklyVolumes.values()).sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );

  return sortedWeeks.map((week, index) => ({
    ...week,
    weekLabel: `Week ${index + 1}`,
  }));
};

const getRecentPRs = async (userId: string) => {
  const allPRs = await prisma.exerciseRecord.findMany({
    where: {
      userId,
      status: RecordStatus.COMPLETED,
    },
    include: {
      recordSets: true,
      exercise: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const exerciseMaxMap = new Map();

  allPRs.forEach((record) => {
    const exerciseName = record.exercise.name;
    const maxSetWeight = Math.max(
      ...record.recordSets.map((set) => set.weight),
      0
    );

    if (
      !exerciseMaxMap.has(exerciseName) ||
      maxSetWeight > exerciseMaxMap.get(exerciseName).weight
    ) {
      exerciseMaxMap.set(exerciseName, {
        exerciseName,
        weight: maxSetWeight,
        date: record.date,
      });
    }
  });

  const PRs = Array.from(exerciseMaxMap.values());
  return PRs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);
};

const resolvers = {
  Query: {
    getDashboardMetrics: async (_: unknown, { userId }: { userId: string }) => {
      const last7DaysConsistency = await getLast7DaysConsistency(userId);
      const volumeLiftedInWeeks = await getVolumeLiftedInWeeks(userId);
      const recentPRs = await getRecentPRs(userId);
      return {
        last7DaysConsistency,
        volumeLiftedInWeeks,
        recentPRs,
      };
    },
  },
};

export default resolvers;
