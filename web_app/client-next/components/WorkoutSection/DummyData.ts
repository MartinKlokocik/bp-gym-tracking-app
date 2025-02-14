import {
  Exercise,
  PlannedExercise,
  PlannedWorkoutDay,
  PlannedWorkout,
  CalendarDay,
  ExerciseRecord,
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
]

export const dummyPlannedExercises: PlannedExercise[] = [
  {
    id: 'pe1',
    exercise: dummyExercises[0],
    sets: [
      { id: 's1', reps: 10, restTime: 60 },
      { id: 's2', reps: 10, restTime: 60 },
      { id: 's3', reps: 10, restTime: 60 },
      { id: 's4', reps: 10, restTime: 60 },
    ],
  },
  {
    id: 'pe2',
    exercise: dummyExercises[1],
    sets: [
      { id: 's1', reps: 8, restTime: 90 },
      { id: 's2', reps: 8, restTime: 90 },
      { id: 's3', reps: 8, restTime: 90 },
      { id: 's4', reps: 8, restTime: 90 },
      { id: 's5', reps: 8, restTime: 90 },
    ],
  },
]

export const dummyPlannedWorkoutDays: PlannedWorkoutDay[] = [
  {
    id: 'pwd1',
    name: 'Leg Day',
    exercises: [dummyPlannedExercises[0], dummyPlannedExercises[1]],
  },
  {
    id: 'pwd2',
    name: 'Upper Body',
    exercises: [dummyPlannedExercises[0]],
  },
]

export const dummyPlannedWorkout: PlannedWorkout = {
  id: 'pw1',
  name: 'Strength Training',
  days: dummyPlannedWorkoutDays,
  schema: 'Train-Rest-Train',
}

export const dummyCalendarDays: CalendarDay[] = [
  {
    date: new Date('2025-02-11'),
    workout: dummyPlannedWorkoutDays[0],
  },
  {
    date: new Date('2025-02-12'),
    workout: dummyPlannedWorkoutDays[1],
  },
]

export const dummyExerciseRecords: ExerciseRecord[] = [
  {
    id: 'er1',
    userId: 'user1',
    timestamp: new Date('2024-05-06T10:30:00Z'),
    exercise: dummyExercises[0],
    sets: [
      { id: 's1', reps: 10, restTime: 60 },
      { id: 's2', reps: 8, restTime: 60 },
      { id: 's3', reps: 6, restTime: 90 },
    ],
  },
  {
    id: 'er2',
    userId: 'user1',
    timestamp: new Date('2024-05-07T14:00:00Z'),
    exercise: dummyExercises[0],
    sets: [
      { id: 's1', reps: 12, restTime: 60 },
      { id: 's2', reps: 10, restTime: 60 },
      { id: 's3', reps: 8, restTime: 90 },
    ],
  },
  {
    id: 'er3',
    userId: 'user1',
    timestamp: new Date('2024-05-06T11:00:00Z'),
    exercise: dummyExercises[1],
    sets: [
      { id: 's1', reps: 8, restTime: 90 },
      { id: 's2', reps: 6, restTime: 90 },
      { id: 's3', reps: 4, restTime: 120 },
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
]