import {
  Exercise,
  PlannedExercise,
  PlannedWorkoutDay,
  PlannedWorkout,
  CalendarDay,
  ExerciseRecord,
  Set,
} from './types'

export const dummyExercises: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    description: 'A chest exercise using a barbell.',
    muscleGroup: 'Chest',
    equipment: ['Barbell', 'Bench'],
    image: 'bench-press.png',
  },
  {
    id: '2',
    name: 'Squat',
    description: 'A lower-body exercise targeting legs and glutes.',
    muscleGroup: 'Legs',
    equipment: ['Barbell', 'Squat Rack'],
    image: 'squat.png',
  },
  {
    id: '3',
    name: 'Deadlift',
    description:
      'A full-body exercise that primarily targets the back and legs.',
    muscleGroup: 'Back',
    equipment: ['Barbell'],
    image: 'deadlift.png',
  },
  {
    id: '4',
    name: 'Pull-ups',
    description: 'An upper-body pulling exercise targeting back and biceps.',
    muscleGroup: 'Back',
    equipment: ['Pull-up Bar'],
    image: 'pullups.png',
  },
  {
    id: '5',
    name: 'Shoulder Press',
    description: 'A shoulder exercise using a barbell or dumbbells.',
    muscleGroup: 'Shoulders',
    equipment: ['Dumbbells', 'Barbell'],
    image: 'shoulder-press.png',
  },
  {
    id: '6',
    name: 'Bicep Curls',
    description: 'An isolation exercise targeting the biceps.',
    muscleGroup: 'Arms',
    equipment: ['Dumbbells'],
    image: 'bicep-curls.png',
  },
]

export const dummyPlannedExercises: PlannedExercise[] = [
  {
    id: 'pe1',
    exercise: dummyExercises[0], // Bench Press
    sets: [
      { id: 's1', reps: 10, restTime: 60 },
      { id: 's2', reps: 10, restTime: 60 },
      { id: 's3', reps: 10, restTime: 60 },
    ],
    notes: 'Focus on slow, controlled reps.',
  },
  {
    id: 'pe2',
    exercise: dummyExercises[1], // Squat
    sets: [
      { id: 's1', reps: 8, restTime: 90 },
      { id: 's2', reps: 8, restTime: 90 },
      { id: 's3', reps: 8, restTime: 90 },
    ],
    notes: 'Keep your back straight and go deep.',
  },
  {
    id: 'pe3',
    exercise: dummyExercises[2], // Deadlift
    sets: [
      { id: 's1', reps: 5, restTime: 120 },
      { id: 's2', reps: 5, restTime: 120 },
      { id: 's3', reps: 5, restTime: 120 },
    ],
    notes: 'Maintain proper form to avoid back injury.',
  },
  {
    id: 'pe4',
    exercise: dummyExercises[3], // Pull-ups
    sets: [
      { id: 's1', reps: 12, restTime: 60 },
      { id: 's2', reps: 10, restTime: 60 },
      { id: 's3', reps: 8, restTime: 60 },
    ],
    notes: 'Full range of motion for best results.',
  },
]

export const dummyPlannedWorkoutDays: PlannedWorkoutDay[] = [
  {
    id: 'pwd1',
    name: 'Leg Day',
    exercises: [dummyPlannedExercises[1], dummyPlannedExercises[2]], // Squat & Deadlift
  },
  {
    id: 'pwd2',
    name: 'Upper Body Strength',
    exercises: [dummyPlannedExercises[0], dummyPlannedExercises[4]], // Bench Press & Shoulder Press
  },
  {
    id: 'pwd3',
    name: 'Pull Day',
    exercises: [dummyPlannedExercises[3], dummyPlannedExercises[5]], // Pull-ups & Bicep Curls
  },
]

export const dummyPlannedWorkouts: PlannedWorkout[] = [
  {
    id: 'pw1',
    name: 'Strength Training',
    days: [dummyPlannedWorkoutDays[0], dummyPlannedWorkoutDays[1]],
    schema: 'Train-Rest-Train',
    isActive: true,
  },
  {
    id: 'pw2',
    name: 'Upper/Lower Split',
    days: [dummyPlannedWorkoutDays[1], dummyPlannedWorkoutDays[2]],
    schema: 'Upper-Lower-Rest',
    isActive: false,
  },
]

export const dummyCalendarDays: CalendarDay[] = [
  {
    date: new Date('2025-02-11'),
    workout: dummyPlannedWorkoutDays[0], // Leg Day
  },
  {
    date: new Date('2025-02-12'),
    workout: dummyPlannedWorkoutDays[1], // Upper Body Strength
  },
  {
    date: new Date('2025-02-13'),
    workout: dummyPlannedWorkoutDays[2], // Pull Day
  },
]

export const dummyExerciseRecords: ExerciseRecord[] = [
  {
    id: 'er1',
    userId: 'user1',
    timestamp: new Date('2024-05-06T10:30:00Z'),
    exercise: dummyExercises[0], // Bench Press
    sets: [
      { id: 's1', reps: 10, restTime: 60, weight: 100 },
      { id: 's2', reps: 8, restTime: 60, weight: 80 },
      { id: 's3', reps: 6, restTime: 90, weight: 60 },
    ],
  },
  {
    id: 'er2',
    userId: 'user1',
    timestamp: new Date('2024-05-07T14:00:00Z'),
    exercise: dummyExercises[1], // Squat
    sets: [
      { id: 's1', reps: 12, restTime: 60, weight: 120 },
      { id: 's2', reps: 10, restTime: 60, weight: 100 },
      { id: 's3', reps: 8, restTime: 90, weight: 80 },
    ],
  },
  {
    id: 'er3',
    userId: 'user1',
    timestamp: new Date('2024-05-06T11:00:00Z'),
    exercise: dummyExercises[2], // Deadlift
    sets: [
      { id: 's1', reps: 8, restTime: 90, weight: 80 },
      { id: 's2', reps: 6, restTime: 90, weight: 60 },
      { id: 's3', reps: 4, restTime: 120, weight: 40 },
    ],
  },
  {
    id: 'er4',
    userId: 'user1',
    timestamp: new Date('2024-05-08T09:00:00Z'),
    exercise: dummyExercises[3], // Pull-ups
    sets: [
      { id: 's1', reps: 12, restTime: 60, weight: 0 }, // Bodyweight
      { id: 's2', reps: 10, restTime: 60, weight: 0 },
      { id: 's3', reps: 8, restTime: 90, weight: 0 },
    ],
  },
]

export const muscleGroups = [
  { value: 'legs', label: 'Legs' },
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'arms', label: 'Arms' },
  { value: 'core', label: 'Core' },
  { value: 'full-body', label: 'Full Body' },
]
