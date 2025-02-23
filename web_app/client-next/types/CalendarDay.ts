import { z } from 'zod'

import { exerciseSchemaWithId } from './Exercise'

export const plannedSetSchemaWithId = z.object({
  id: z.string(),
  reps: z
    .number({ invalid_type_error: 'Reps must be a number' })
    .min(1, 'Reps must be at least 1'),
  restTime: z.number().optional(),
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

export const calendarDaySchema = z.object({
  userId: z.string(),
  date: z.string(),
  plannedWorkoutDay: plannedWorkoutDaySchemaWithId,
})

export type PlannedWorkoutDayWithId = z.infer<
  typeof plannedWorkoutDaySchemaWithId
>
export type PlannedWorkoutWithId = z.infer<typeof plannedWorkoutSchemaWithId>
export type CalendarDay = z.infer<typeof calendarDaySchema>
