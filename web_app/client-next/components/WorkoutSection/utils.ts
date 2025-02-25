import { PlannedWorkoutWithIdsType } from '@/types/WorkoutPlanning'

export const getActiveWorkoutPlan = (
  workoutPlans: PlannedWorkoutWithIdsType[]
) => {
  return workoutPlans?.find(workout => workout.isActive)
}
