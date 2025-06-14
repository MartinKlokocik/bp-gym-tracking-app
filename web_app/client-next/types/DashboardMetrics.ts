export type VolumeLiftedInWeeks = {
  weekLabel: string
  dateFrom: string
  dateTo: string
  volume: number
}

export type RecentPRs = {
  exerciseName: string
  weight: number
  date: string
}

export type MuscleGroupsFocus = {
  muscleGroup: string
  count: number
}

export type ProgressionCurve = {
  exerciseName: string
  weights: number[]
}

export type WorkoutCompletionRate = {
  dateFrom: string
  dateTo: string
  numberOfCompletedExercises: number
  numberOfSkipped: number
  numberOfPending: number
}
