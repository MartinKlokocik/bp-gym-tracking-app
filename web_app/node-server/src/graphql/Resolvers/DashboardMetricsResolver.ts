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
  ).slice(0, 4);
};

const getMuscleGroupsFocus = async (userId: string) => {
  const records = await prisma.exerciseRecord.findMany({
    where: {
      userId,
      status: RecordStatus.COMPLETED,
    },
    include: {
      exercise: true,
    },
  });

  const muscleGroupsMap = new Map();

  records.forEach((record) => {
    const muscleGroup = record.exercise.muscleGroup;
    if (muscleGroup) {
      if (muscleGroupsMap.has(muscleGroup)) {
        muscleGroupsMap.set(muscleGroup, muscleGroupsMap.get(muscleGroup) + 1);
      } else {
        muscleGroupsMap.set(muscleGroup, 1);
      }
    }
  });

  return Array.from(muscleGroupsMap.entries()).map(([muscleGroup, count]) => ({
    muscleGroup,
    count,
  }));
};

const getProgressionCurveForKeyLifts = async (userId: string) => {
  const records = await prisma.exerciseRecord.findMany({
    where: {
      userId,
      status: RecordStatus.COMPLETED,
      exercise: {
        name: {
          in: ["Bench Press", "Barbell Squat", "Deadlift"],
        },
      },
    },
    include: {
      recordSets: true,
      exercise: true,
    },
  });

  const progressionCurve = new Map();

  records.forEach((record) => {
    const exerciseName = record.exercise.name;
    const maxSetWeight = Math.max(
      ...record.recordSets.map((set) => set.weight)
    );
    if (!progressionCurve.has(exerciseName)) {
      progressionCurve.set(exerciseName, []);
    }
    progressionCurve.get(exerciseName).push(maxSetWeight);
  });

  return Array.from(progressionCurve.entries()).map(
    ([exerciseName, weights]) => ({
      exerciseName,
      weights,
    })
  );
};

const getWorkoutCompletionRate = async (userId: string) => {
  const exerciseRecords = await prisma.exerciseRecord.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "asc",
    },
  });

  const weeklyStats = new Map();

  exerciseRecords.forEach((record) => {
    const recordDate = new Date(record.date);
    const weekStart = new Date(recordDate);
    weekStart.setDate(recordDate.getDate() - recordDate.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weeklyStats.has(weekKey)) {
      weeklyStats.set(weekKey, {
        dateFrom: weekStart.toISOString().split("T")[0],
        dateTo: weekEnd.toISOString().split("T")[0],
        numberOfCompletedExercises: 0,
        numberOfSkipped: 0,
        numberOfPending: 0,
      });
    }

    const week = weeklyStats.get(weekKey);

    if (record.status === RecordStatus.COMPLETED) {
      week.numberOfCompletedExercises += 1;
    } else if (record.status === RecordStatus.SKIPPED) {
      week.numberOfSkipped += 1;
    } else if (record.status === RecordStatus.PENDING) {
      week.numberOfPending += 1;
    }
  });

  const sortedWeeks = Array.from(weeklyStats.values()).sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );

  return sortedWeeks.map((week, index) => ({
    ...week,
    weekLabel: `Week ${index + 1}`,
  }));
};

const getAveragePulseData = async (userId: string) => {
  const exerciseRecords = await prisma.exerciseRecord.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
      recordSets: {
        where: {
          avgPulse: {
            not: null,
            gt: 0,
          },
        },
        select: {
          avgPulse: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const dailyPulseMap = new Map();

  exerciseRecords.forEach((record) => {
    if (record.recordSets.length === 0) return;

    const date = record.date;

    if (!dailyPulseMap.has(date)) {
      dailyPulseMap.set(date, []);
    }

    record.recordSets.forEach((set) => {
      dailyPulseMap.get(date).push(set.avgPulse);
    });
  });

  return Array.from(dailyPulseMap.entries()).map(([date, pulses]) => ({
    date,
    averagePulse: Math.round(
      pulses.reduce((sum: number, pulse: number) => sum + pulse, 0) / pulses.length
    ),
  }));
};

const resolvers = {
  Query: {
    getDashboardMetrics: async (_: unknown, { userId }: { userId: string }) => {
      const last7DaysConsistency = await getLast7DaysConsistency(userId);
      const volumeLiftedInWeeks = await getVolumeLiftedInWeeks(userId);
      const recentPRs = await getRecentPRs(userId);
      const muscleGroupsFocus = await getMuscleGroupsFocus(userId);
      const progressionCurve = await getProgressionCurveForKeyLifts(userId);
      const workoutCompletionRate = await getWorkoutCompletionRate(userId);
      const averagePulseData = await getAveragePulseData(userId);
      return {
        last7DaysConsistency,
        volumeLiftedInWeeks,
        recentPRs,
        muscleGroupsFocus,
        progressionCurve,
        workoutCompletionRate,
        averagePulseData,
      };
    },
  },
};

export default resolvers;
