export const plannedWorkoutsData = [
  {
    name: "Full Body Strength Split",
    isActive: false,
    isPublic: true,
    days: [
      {
        name: "Lower Body Power",
        plannedExercises: [
          {
            exerciseName: "Barbell Squat",
            notes: "Go below parallel. Maintain tight core.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 5, restTime: 120 },
              { setNumber: 2, reps: 5, restTime: 120 },
              { setNumber: 3, reps: 5, restTime: 120 },
            ],
          },
          {
            exerciseName: "Romanian Deadlift",
            notes: "Focus on stretch in hamstrings.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Calf Raise",
            notes: "Full range of motion.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 15, restTime: 60 },
              { setNumber: 2, reps: 15, restTime: 60 },
              { setNumber: 3, reps: 15, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Upper Body Push",
        plannedExercises: [
          {
            exerciseName: "Bench Press",
            notes: "Control the descent.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 6, restTime: 120 },
              { setNumber: 2, reps: 6, restTime: 120 },
              { setNumber: 3, reps: 6, restTime: 120 },
            ],
          },
          {
            exerciseName: "Dumbbell Shoulder Press",
            notes: "Keep elbows under the wrists.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
              { setNumber: 3, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Chest Fly",
            notes: "Focus on stretch and squeeze.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Upper Body Pull",
        plannedExercises: [
          {
            exerciseName: "Pull-Up",
            notes: "Use full range, no swinging.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 6, restTime: 90 },
              { setNumber: 2, reps: 6, restTime: 90 },
              { setNumber: 3, reps: 6, restTime: 90 },
            ],
          },
          {
            exerciseName: "Barbell Row",
            notes: "Stay strict, no momentum.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
              { setNumber: 3, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Face Pull",
            notes: "Focus on rear delt contraction.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 15, restTime: 60 },
              { setNumber: 2, reps: 15, restTime: 60 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Strength & Hypertrophy Hybrid",
    isActive: false,
    isPublic: true,
    days: [
      {
        name: "Legs & Glutes",
        plannedExercises: [
          {
            exerciseName: "Deadlift",
            notes: "Use mixed grip, keep spine neutral.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 5, restTime: 150 },
              { setNumber: 2, reps: 5, restTime: 150 },
              { setNumber: 3, reps: 5, restTime: 150 },
            ],
          },
          {
            exerciseName: "Barbell Hip Thrust",
            notes: "Pause at top for 1 sec.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
              { setNumber: 3, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Leg Press",
            notes: "Controlled descent.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Chest & Arms",
        plannedExercises: [
          {
            exerciseName: "Incline Dumbbell Press",
            notes: "Touch chest at bottom.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Skull Crushers",
            notes: "Don't flare elbows.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 75 },
              { setNumber: 2, reps: 10, restTime: 75 },
            ],
          },
          {
            exerciseName: "Hammer Curl",
            notes: "Strict form, no swing.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
              { setNumber: 3, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Back & Shoulders",
        plannedExercises: [
          {
            exerciseName: "Lat Pulldown",
            notes: "Pull to upper chest.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
              { setNumber: 3, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Overhead Press",
            notes: "No leg drive.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 6, restTime: 120 },
              { setNumber: 2, reps: 6, restTime: 120 },
            ],
          },
          {
            exerciseName: "Seated Cable Row",
            notes: "Hold contraction for 1 sec.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Push Pull Legs Classic",
    isActive: false,
    isPublic: true,
    days: [
      {
        name: "Push Day",
        plannedExercises: [
          {
            exerciseName: "Bench Press",
            notes: "Pause on chest briefly.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 6, restTime: 120 },
              { setNumber: 2, reps: 6, restTime: 120 },
            ],
          },
          {
            exerciseName: "Dumbbell Shoulder Press",
            notes: "Stay seated and upright.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
              { setNumber: 3, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Chest Fly",
            notes: "Slow on the eccentric.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Pull Day",
        plannedExercises: [
          {
            exerciseName: "Pull-Up",
            notes: "Use full range of motion.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Barbell Row",
            notes: "Row to lower chest.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
              { setNumber: 3, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Hammer Curl",
            notes: "Squeeze biceps at top.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Leg Day",
        plannedExercises: [
          {
            exerciseName: "Barbell Squat",
            notes: "Go parallel or deeper.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 6, restTime: 120 },
              { setNumber: 2, reps: 6, restTime: 120 },
            ],
          },
          {
            exerciseName: "Bulgarian Split Squat",
            notes: "Keep torso upright.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Calf Raise",
            notes: "Explode up, pause at top.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 15, restTime: 60 },
              { setNumber: 2, reps: 15, restTime: 60 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Athletic Power Builder",
    isActive: false,
    isPublic: true,
    days: [
      {
        name: "Explosive Strength",
        plannedExercises: [
          {
            exerciseName: "Barbell Squat",
            notes: "Drive explosively from the bottom.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 4, restTime: 150 },
              { setNumber: 2, reps: 4, restTime: 150 },
            ],
          },
          {
            exerciseName: "Deadlift",
            notes: "Speed through the lift, no bounce.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 3, restTime: 180 },
              { setNumber: 2, reps: 3, restTime: 180 },
            ],
          },
          {
            exerciseName: "Overhead Press",
            notes: "Explode upward, tight core.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 5, restTime: 120 },
              { setNumber: 2, reps: 5, restTime: 120 },
            ],
          },
        ],
      },
      {
        name: "Upper Body Volume",
        plannedExercises: [
          {
            exerciseName: "Incline Dumbbell Press",
            notes: "Control tempo, full range.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Barbell Row",
            notes: "Strict form, slight pause at top.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Face Pull",
            notes: "Squeeze rear delts.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 15, restTime: 60 },
              { setNumber: 2, reps: 15, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Posterior Chain Focus",
        plannedExercises: [
          {
            exerciseName: "Romanian Deadlift",
            notes: "Feel the stretch, stay tight.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Barbell Hip Thrust",
            notes: "Pause at top, strong squeeze.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 75 },
              { setNumber: 2, reps: 12, restTime: 75 },
            ],
          },
          {
            exerciseName: "Calf Raise",
            notes: "No bouncing. Squeeze at top.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 20, restTime: 45 },
              { setNumber: 2, reps: 20, restTime: 45 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Glutes & Upper Body Strength",
    isActive: false,
    isPublic: true,
    days: [
      {
        name: "Glute Domination",
        plannedExercises: [
          {
            exerciseName: "Bulgarian Split Squat",
            notes: "Push through the heel.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Barbell Hip Thrust",
            notes: "Big squeeze, controlled down.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 75 },
              { setNumber: 2, reps: 12, restTime: 75 },
            ],
          },
          {
            exerciseName: "Romanian Deadlift",
            notes: "Keep bar close to body.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
            ],
          },
        ],
      },
      {
        name: "Back & Biceps",
        plannedExercises: [
          {
            exerciseName: "Lat Pulldown",
            notes: "Don't lean back excessively.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 75 },
              { setNumber: 2, reps: 10, restTime: 75 },
              { setNumber: 3, reps: 10, restTime: 75 },
            ],
          },
          {
            exerciseName: "Hammer Curl",
            notes: "Controlled tempo.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
          {
            exerciseName: "Seated Cable Row",
            notes: "Squeeze shoulder blades.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 12, restTime: 60 },
              { setNumber: 2, reps: 12, restTime: 60 },
            ],
          },
        ],
      },
      {
        name: "Chest & Delts",
        plannedExercises: [
          {
            exerciseName: "Incline Dumbbell Press",
            notes: "Keep constant tension.",
            exerciseNumber: 1,
            plannedSets: [
              { setNumber: 1, reps: 10, restTime: 90 },
              { setNumber: 2, reps: 10, restTime: 90 },
            ],
          },
          {
            exerciseName: "Dumbbell Shoulder Press",
            notes: "Avoid arching lower back.",
            exerciseNumber: 2,
            plannedSets: [
              { setNumber: 1, reps: 8, restTime: 90 },
              { setNumber: 2, reps: 8, restTime: 90 },
              { setNumber: 3, reps: 8, restTime: 90 },
            ],
          },
          {
            exerciseName: "Face Pull",
            notes: "Control both directions.",
            exerciseNumber: 3,
            plannedSets: [
              { setNumber: 1, reps: 15, restTime: 60 },
              { setNumber: 2, reps: 15, restTime: 60 },
            ],
          },
        ],
      },
    ],
  },
];
