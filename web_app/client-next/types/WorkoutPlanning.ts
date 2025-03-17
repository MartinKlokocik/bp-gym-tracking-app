import { z } from 'zod'

import { exerciseSchemaWithId } from './Exercise'

export const plannedSetSchema = z.object({
  reps: z
    .number({ invalid_type_error: 'Reps must be a number' })
    .min(1, 'Reps must be at least 1'),
  restTime: z.number().optional(),
  setNumber: z.number(),
})

export const plannedExerciseSchema = z.object({
  userId: z.string(),
  notes: z.string().optional(),
  exerciseId: z.string(),
  exercise: exerciseSchemaWithId,
  plannedSets: z.array(plannedSetSchema).min(1, 'At least one set is required'),
})

export const plannedWorkoutDaySchema = z.object({
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

// With IDs
export const plannedSetSchemaWithId = z.object({
  id: z.string(),
  reps: z
    .number({ invalid_type_error: 'Reps must be a number' })
    .min(1, 'Reps must be at least 1'),
  restTime: z.number().optional(),
  setNumber: z.number(),
})

export const plannedExerciseSchemaWithId = z.object({
  id: z.string(),
  userId: z.string(),
  notes: z.string().optional(),
  exercise: exerciseSchemaWithId,
  plannedSets: z
    .array(plannedSetSchemaWithId)
    .min(1, 'At least one set is required'),
})

export const plannedWorkoutDaySchemaWithId = z.object({
  id: z.string(),
  name: z.string().nonempty('Workout day name is required'),
  userId: z.string(),
  plannedExercises: z.array(plannedExerciseSchemaWithId).default([]),
})

export const plannedWorkoutSchemaWithId = z.object({
  userId: z.string(),
  id: z.string(),
  name: z.string().nonempty('Plan name is required'),
  days: z
    .array(plannedWorkoutDaySchemaWithId)
    .min(1, 'At least one day is required'),
  schema: z.string().optional(),
  isActive: z.boolean(),
  isPublic: z.boolean(),
})

export type PlannedWorkoutWithIdsType = z.infer<
  typeof plannedWorkoutSchemaWithId
>
export type PlannedWorkoutDayWithIdType = z.infer<
  typeof plannedWorkoutDaySchemaWithId
>
export type PlannedWorkoutWithoutIdsType = z.infer<typeof plannedWorkoutSchema>
export type PlannedExerciseWithIdsType = z.infer<
  typeof plannedExerciseSchemaWithId
>
export type PlannedExerciseWithoutIdsType = z.infer<
  typeof plannedExerciseSchema
>
export type PlannedSetWithoutIdsType = z.infer<typeof plannedSetSchema>
