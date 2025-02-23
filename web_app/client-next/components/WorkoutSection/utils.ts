import { ExerciseRecord } from './types'

import { ExerciseWithIdsType } from '@/types/Exercise'
import { PlannedWorkoutWithIdsType } from '@/types/WorkoutPlanning'

export const getLatestExerciseRecord = (
  exercise: ExerciseWithIdsType | null
): ExerciseRecord | null => {
  return null
}

export const getExerciseRecords = (
  exercise: ExerciseWithIdsType | undefined
) => {
  if (!exercise) return []

  return [
    {
      id: 'er4',
      userId: 'user1',
      timestamp: new Date('2024-05-08T09:00:00Z'),
      exercise: exercise,
      sets: [
        { id: 's1', reps: 12, restTime: 60, weight: 0 },
        { id: 's2', reps: 10, restTime: 60, weight: 0 },
        { id: 's3', reps: 8, restTime: 90, weight: 0 },
      ],
    },
  ]
}

export const getActiveWorkoutPlan = (
  workoutPlans: PlannedWorkoutWithIdsType[]
) => {
  return workoutPlans?.find(workout => workout.isActive)
}
