import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getExerciseRecord = async (exerciseRecordId: string) => {
  const exerciseRecord = await prisma.exerciseRecord.findUnique({
    where: {
      id: exerciseRecordId,
    },
    select: {
      recordSets: {
        select: {
          reps: true,
          weight: true,
          restTime: true,
        },
      },
      date: true,
      notes: true,
      userId: true,
      exercise: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return exerciseRecord;
};

const getLatestRecord = async (
  exerciseId: string,
  userId: string,
  date: string
) => {
  const latestRecord = await prisma.exerciseRecord.findFirst({
    where: {
      exerciseId: exerciseId,
      userId: userId,
      date: {
        lte: date,
      },
      status: "COMPLETED",
    },
    orderBy: {
      date: "desc",
    },
    select: {
      recordSets: {
        select: {
          reps: true,
          weight: true,
          restTime: true,
        },
      },
      date: true,
      notes: true,
      userId: true,
      exercise: {
        select: {
          name: true,
        },
      },
    },
  });

  return latestRecord;
};

const getPreviousRecords = async (
  exerciseId: string,
  userId: string,
  currentRecordDate: string
) => {
  const previousWorkouts = await prisma.exerciseRecord.findMany({
    where: {
      exerciseId: exerciseId,
      userId: userId,
      status: "COMPLETED",
      date: {
        lte: currentRecordDate,
      },
    },
    orderBy: {
      date: "desc",
    },
    select: {
      recordSets: {
        select: {
          reps: true,
          weight: true,
          restTime: true,
        },
      },
      date: true,
      notes: true,
      exercise: {
        select: {
          name: true,
        },
      },
    },
  });

  return previousWorkouts;
};

const getUserData = async (userId: string) => {
  const userData = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
    select: {
      dateOfBirth: true,
      height: true,
      weight: true,
      gender: true,
      fitnessLevel: true,
      primaryGoal: true,
      secondaryGoals: true,
      yearsOfExperience: true,
      healthIssues: true,
      injuries: true,
    },
  });

  let age;
  if (userData?.dateOfBirth) {
    const birthDate = new Date(userData.dateOfBirth);
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  }

  let bmi;
  if (userData?.height && userData?.weight) {
    const heightInMeters = userData.height / 100;
    bmi = userData.weight / (heightInMeters * heightInMeters);
    bmi = Math.round(bmi * 10) / 10;
  }

  return {
    ...userData,
    age,
    bmi,
  };
};

const getDataForWeightOptimalization = async (
  exerciseRecordId: string
) => {
  try {
    const exerciseRecord = await getExerciseRecord(exerciseRecordId);
    if (!exerciseRecord) {
      throw new Error("Exercise record not found");
    }
    const latestRecord = await getLatestRecord(
      exerciseRecord.exercise.id,
      exerciseRecord.userId,
      exerciseRecord.date
    );
    const previousWorkouts = await getPreviousRecords(
      exerciseRecord.exercise.id,
      exerciseRecord.userId,
      exerciseRecord.date
    );
    const userData = await getUserData(exerciseRecord.userId);

    return {
      latestRecord,
      previousWorkouts,
      userData,
      exerciseName: exerciseRecord.exercise.name,
    };
  } catch (error) {
    console.error("Error getting data for weight optimalization:", error);
    throw error;
  }
};

export { getDataForWeightOptimalization };
