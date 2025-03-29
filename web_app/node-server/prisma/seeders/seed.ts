import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_USER_ID = "4116f715-df81-4887-8010-6c77f300eea7"; // Replace this with your admin user ID

async function main() {
  console.log("Seeding database...");

  // Seed Exercises
  await prisma.exercise.createMany({
    data: [
      {
        userId: ADMIN_USER_ID,
        name: "Barbell Squat",
        description:
          "A fundamental lower-body exercise that targets the quads, hamstrings, and glutes.",
        muscleGroup: "Legs",
        equipment: ["Barbell", "Squat Rack"],
        image: "barbell-squat.png",
        isPublic: true,
        isDefault: true,
        type: "strength",
      },
      {
        userId: ADMIN_USER_ID,
        name: "Deadlift",
        description:
          "A compound exercise that strengthens the lower back, glutes, and hamstrings.",
        muscleGroup: "Back",
        equipment: ["Barbell"],
        image: "deadlift.png",
        isPublic: true,
        isDefault: true,
        type: "strength",
      },
      {
        userId: ADMIN_USER_ID,
        name: "Overhead Press",
        description:
          "Targets the shoulders and triceps by pressing a barbell overhead.",
        muscleGroup: "Shoulders",
        equipment: ["Barbell"],
        image: "overhead-press.png",
        isPublic: true,
        isDefault: true,
        type: "strength",
      },
      {
        userId: ADMIN_USER_ID,
        name: "Lat Pulldown",
        description:
          "An isolation exercise for the upper back and lats using a cable machine.",
        muscleGroup: "Back",
        equipment: ["Cable Machine"],
        image: "lat-pulldown.png",
        isPublic: true,
        isDefault: true,
        type: "strength",
      },
      {
        userId: ADMIN_USER_ID,
        name: "Treadmill Run",
        description:
          "A cardio exercise focused on endurance and fat burning on a treadmill.",
        muscleGroup: "Legs",
        equipment: [],
        image: "treadmill-run.png",
        isPublic: true,
        isDefault: true,
        type: "cardio",
      },
      {
        userId: ADMIN_USER_ID,
        name: "Rowing Machine",
        description: "A full-body cardio workout using a rowing machine.",
        muscleGroup: "Full Body",
        equipment: ["Rowing Machine"],
        image: "rowing-machine.png",
        isPublic: true,
        isDefault: true,
        type: "cardio",
      },
    ],
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

  const plannedWorkouts = [
    {
      name: "Full Body Athletic Plan",
      isActive: false,
      isPublic: true,
      days: [
        {
          name: "Power & Explosiveness",
          plannedExercises: [
            {
              exerciseName: "Barbell Squat",
              notes: "Explosive movement up.",
              exerciseNumber: 1,
              plannedSets: [
                { setNumber: 1, reps: 3, restTime: 150 },
                { setNumber: 2, reps: 3, restTime: 150 },
              ],
            },
            {
              exerciseName: "Deadlift",
              notes: "Grip tight, controlled movement.",
              exerciseNumber: 2,
              plannedSets: [
                { setNumber: 1, reps: 4, restTime: 120 },
                { setNumber: 2, reps: 4, restTime: 120 },
              ],
            },
          ],
        },
        {
          name: "Endurance & Core",
          plannedExercises: [
            {
              exerciseName: "Treadmill Run",
              notes: "Maintain steady pace.",
              exerciseNumber: 1,
              plannedSets: [
                { setNumber: 1, reps: 20, restTime: 30 },
                { setNumber: 2, reps: 20, restTime: 30 },
              ],
            },
            {
              exerciseName: "Rowing Machine",
              notes: "Use slow, controlled reps.",
              exerciseNumber: 2,
              plannedSets: [
                { setNumber: 1, reps: 15, restTime: 45 },
                { setNumber: 2, reps: 15, restTime: 45 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Hypertrophy & Definition Plan",
      isActive: false,
      isPublic: true,
      days: [
        {
          name: "Chest & Shoulders",
          plannedExercises: [
            {
              exerciseName: "Overhead Press",
              notes: "Controlled eccentric.",
              exerciseNumber: 1,
              plannedSets: [
                { setNumber: 1, reps: 10, restTime: 45 },
                { setNumber: 2, reps: 8, restTime: 45 },
              ],
            },
          ],
        },
        {
          name: "Leg Day Focus",
          plannedExercises: [
            {
              exerciseName: "Barbell Squat",
              notes: "Go deep in each rep.",
              exerciseNumber: 1,
              plannedSets: [
                { setNumber: 1, reps: 8, restTime: 60 },
                { setNumber: 2, reps: 8, restTime: 60 },
              ],
            },
            {
              exerciseName: "Lat Pulldown",
              notes: "Use slow, controlled reps.",
              exerciseNumber: 2,
              plannedSets: [
                { setNumber: 1, reps: 12, restTime: 60 },
                { setNumber: 2, reps: 12, restTime: 60 },
              ],
            },
          ],
        },
      ],
    },
  ];

  for (const workout of plannedWorkouts) {
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

  console.log("Additional planned workouts seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
