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
    personalBest: 100,
    image: 'bench-press.png',
  },
  {
    id: '2',
    name: 'Squat',
    description: 'A lower-body exercise targeting legs and glutes.',
    muscleGroup: 'Legs',
    equipment: ['Barbell', 'Squat Rack'],
    personalBest: 150,
    image: 'squat.png',
  },
]

export const dummyPlannedExercises: PlannedExercise[] = [
  {
    id: 'pe1',
    exercise: dummyExercises[0],
    sets: 4,
    reps: 10,
    weights: [80, 85, 90, 95],
    restTime: [60, 60, 60, 60],
  },
  {
    id: 'pe2',
    exercise: dummyExercises[1],
    sets: 5,
    reps: 8,
    weights: [100, 110, 120, 130, 140],
    restTime: [90, 90, 90, 90, 90],
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
    sets: 3,
    reps: [10, 8, 6],
    weights: [80, 90, 100],
    restTime: [60, 60, 90],
  },
  {
    id: 'er2',
    userId: 'user1',
    timestamp: new Date('2024-05-07T14:00:00Z'),
    exercise: dummyExercises[0],
    sets: 3,
    reps: [12, 10, 8],
    weights: [85, 95, 105],
    restTime: [60, 60, 90],
  },
  {
    id: 'er3',
    userId: 'user1',
    timestamp: new Date('2024-05-06T11:00:00Z'),
    exercise: dummyExercises[1],
    sets: 3,
    reps: [8, 6, 4],
    weights: [120, 130, 140],
    restTime: [90, 90, 120],
  },
]