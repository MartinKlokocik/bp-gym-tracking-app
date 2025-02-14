export type Exercise = {
  id: string
  name: string
  description: string
  muscleGroup: string
  equipment: Array<string>
  image: string
}

export type PlannedExercise = {
  id: string
  exercise: Exercise
  sets: Set[]
  notes?: string
}

export type Set = {
  id: string
  reps: number
  restTime?: number
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
  sets: (Set & { weight: number })[]
}
