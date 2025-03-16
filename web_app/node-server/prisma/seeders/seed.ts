import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_USER_ID = "YOUR_ADMIN_USER_ID"; // Replace this with your admin user ID

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
              exerciseId: "bfce4435-e546-4610-9fd6-972d9d3fec3c",
              notes: "Explosive movement up.",
              plannedSets: [
                { setNumber: 1, reps: 3, restTime: 150 },
                { setNumber: 2, reps: 3, restTime: 150 },
              ],
            },
            {
              exerciseId: "402799f4-c4cf-4809-a5cd-bfb470ad2eed",
              notes: "Grip tight, controlled movement.",
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
              exerciseId: "6046cc81-3978-4bdc-a580-5f1c6bf78fde",
              notes: "Maintain steady pace.",
              plannedSets: [
                { setNumber: 1, reps: 20, restTime: 30 },
                { setNumber: 2, reps: 20, restTime: 30 },
              ],
            },
            {
              exerciseId: "2f26c432-0bd0-47ff-8542-5a958f0bc20d",
              notes: "Use slow, controlled reps.",
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
              exerciseId: "d3f8ff53-9b8e-4204-b2e5-596cd3973345",
              notes: "Controlled eccentric.",
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
              exerciseId: "bfce4435-e546-4610-9fd6-972d9d3fec3c",
              notes: "Go deep in each rep.",
              plannedSets: [
                { setNumber: 1, reps: 8, restTime: 60 },
                { setNumber: 2, reps: 8, restTime: 60 },
              ],
            },
            {
              exerciseId: "17814a56-c0d8-40b7-b7fc-d69ad87cdf73",
              notes: "Use slow, controlled reps.",
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
                exerciseId: exercise.exerciseId,
                notes: exercise.notes,
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

console.log("Additional planned workouts seeded successfully!");

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
