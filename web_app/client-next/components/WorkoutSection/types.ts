export type Exercise = {
  id: string
  userId: string
  name: string
  description: string
  muscleGroup: string
  equipment: Array<string>
  image: string
  isPublic?: boolean
}

export type PlannedExercise = {
  id: string
  userId: string
  exercise: Exercise
  sets: RecordSet[]
  notes?: string
}

export type RecordSet = {
  id: string
  reps: number
  restTime?: number
}

export type PlannedWorkoutDay = {
  id: string
  userId: string
  name: string
  exercises: Array<PlannedExercise>
}

export type PlannedWorkout = {
  id: string
  userId: string
  name: string
  days: Array<PlannedWorkoutDay>
  schema: string
  isActive?: boolean
  isPublic?: boolean
}

export type CalendarDay = {
  id: string
  userId: string
  date: Date
  workout: PlannedWorkoutDay
}

export type ExerciseRecord = {
  id: string
  userId: string
  timestamp: Date
  exercise: Exercise
  sets: (RecordSet & { weight: number })[]
}

export type User = {
  id: string
  name: string
  email: string
  password: string
}
