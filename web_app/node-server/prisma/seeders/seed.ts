import { PrismaClient } from "@prisma/client";
import { exercisesData } from "./exercisesData";
import { plannedWorkoutsData } from "./plannedWorkoutsData";

const prisma = new PrismaClient();

const ADMIN_USER = await prisma.user.findFirst({
  where: {
    isAdmin: true,
  },
});

const ADMIN_USER_ID = ADMIN_USER?.id || "";

async function main() {
  console.log("Seeding database...");

  // Seed Exercises
  await prisma.exercise.createMany({
    data: exercisesData,
  });

  console.log("Exercises seeded successfully!");

  const allExercises = await prisma.exercise.findMany();

  function findExerciseIdByName(name: string) {
    const exercise = allExercises.find((ex) => ex.name === name);
    if (!exercise) {
      throw new Error(`No exercise found with name: ${name}`);
    }
    return exercise.id;
  }

  // Seed Planned Workouts
  for (const workout of plannedWorkoutsData) {
    await prisma.plannedWorkout.create({
      data: {
        userId: ADMIN_USER_ID,
        name: workout.name,
        isActive: workout.isActive,
        isPublic: workout.isPublic,
        days: {
          create: workout.days.map((day) => ({
            userId: ADMIN_USER_ID,
            name: day.name,
            plannedExercises: {
              create: day.plannedExercises.map((exercise) => ({
                userId: ADMIN_USER_ID,
                exerciseId: findExerciseIdByName(exercise.exerciseName),
                notes: exercise.notes,
                exerciseNumber: exercise.exerciseNumber,
                plannedSets: { create: exercise.plannedSets },
              })),
            },
          })),
        },
      },
    });
  }

  console.log("Planned workouts seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
