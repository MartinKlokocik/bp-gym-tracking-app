import { ExerciseWithIdsType } from '@/types/Exercise'

export type RecordSet = {
  id: string
  reps: number
  restTime?: number
}

export type ExerciseRecord = {
  id: string
  userId: string
  timestamp: Date
  exercise: ExerciseWithIdsType
  sets: (RecordSet & { weight: number })[]
}
