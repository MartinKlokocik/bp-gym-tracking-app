import { ExerciseRecord } from './types'

import { ExerciseWithIdsType } from '@/types/Exercise'
import { PlannedWorkoutWithIdsType } from '@/types/WorkoutPlanning'

export const getLatestExerciseRecord = (
  exercise: ExerciseWithIdsType | null
): ExerciseRecord | null => {
  return null
}

export const getActiveWorkoutPlan = (
  workoutPlans: PlannedWorkoutWithIdsType[]
) => {
  return workoutPlans?.find(workout => workout.isActive)
}
