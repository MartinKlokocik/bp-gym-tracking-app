export type Exercise = {
  id: string
  name: string
  description: string
  muscleGroup: string
  equipment: Array<string>
  personalBest: number
  image: string
}

export type PlannedExercise = {
  id: string
  exercise: Exercise
  sets: number
  reps: number
  weights: Array<number>
  restTime: Array<number>
}

export type PlannedWorkoutDay = {
  id: string
  name: string
  exercises: Array<PlannedExercise>
}

export type PlannedWorkout = {
  id: string
  name: string
  days: Array<PlannedWorkoutDay>
  schema: string
}

export type CalendarDay = {
  date: Date
  workout: PlannedWorkoutDay
}

export type ExerciseRecord = {
  id: string
  userId: string
  timestamp: Date
  exercise: Exercise
  sets: number
  reps: Array<number>
  weights: Array<number>
  restTime: Array<number>
}

