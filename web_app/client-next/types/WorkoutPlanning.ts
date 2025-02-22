import { z } from 'zod'
import { exerciseSchemaWithId } from './Exercise'

const plannedSetSchema = z.object({
  reps: z
    .number({ invalid_type_error: 'Reps must be a number' })
    .min(1, 'Reps must be at least 1'),
  restTime: z.number().optional(),
})

const plannedExerciseSchema = z.object({
  userId: z.string(),
  notes: z.string().optional(),
  exerciseId: z.string(),
  exercise: exerciseSchemaWithId,
  plannedSets: z.array(plannedSetSchema).min(1, 'At least one set is required'),
})

const plannedWorkoutDaySchema = z.object({
  name: z.string().nonempty('Workout day name is required'),
  userId: z.string(),
  plannedExercises: z.array(plannedExerciseSchema).default([]),
})

export const plannedWorkoutSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty('Plan name is required'),
  days: z.array(plannedWorkoutDaySchema).min(1, 'At least one day is required'),
  schema: z.string().optional(),
  isActive: z.boolean(),
  isPublic: z.boolean(),
})

export type CreateWorkoutPlanFormData = z.infer<typeof plannedWorkoutSchema>
export type PlannedExercise = z.infer<typeof plannedExerciseSchema>
export type PlannedSet = z.infer<typeof plannedSetSchema>