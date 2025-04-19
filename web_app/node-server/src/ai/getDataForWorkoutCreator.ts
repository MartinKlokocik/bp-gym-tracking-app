import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getExercises = async () => {
  const exercises = await prisma.exercise.findMany();
  return exercises;
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

const getDataForWorkoutCreator = async (userId: string) => {
  try {
    const exercises = await getExercises();
    const userData = await getUserData(userId);

    return {
      exercises,
      userData,
    };
  } catch (error) {
    console.error("Error getting data for workout creator:", error);
    throw error;
  }
};

const prepareResultForWorkoutCreator = (
  result: any,
  userId: string,
  exercises: any[]
) => {
  if (result.schema === null) {
    result.schema = "";
  }

  result.userId = userId
  result.isActive = false
  result.isPublic = false

  const workoutDays = result.days.map((day: any) => {
    day.userId = userId;

    day.plannedExercises = day.plannedExercises.map((plannedExercise: any) => {
      plannedExercise.userId = userId;

      const exerciseObj = exercises.find(
        (ex: any) => ex.id === plannedExercise.exerciseId
      );
      if (exerciseObj) {
        plannedExercise.exercise = exerciseObj;
      }

      return plannedExercise;
    });

    return day;
  });

  result.days = workoutDays;
  return result;
};

export { getDataForWorkoutCreator, prepareResultForWorkoutCreator };
