import { z } from 'zod'

const exerciseRecordCalendarDaySchema = z.object({
  id: z.string(),
  date: z.string(),
})

export const recordSetSchema = z.object({
  id: z.string(),
  reps: z.number(),
  weight: z.number(),
  restTime: z.number(),
})

export const exerciseRecordSchema = z.object({
  userId: z.string(),
  exerciseId: z.string(),
  recordSets: z.array(recordSetSchema),
  calendarDay: exerciseRecordCalendarDaySchema,
})

export type ExerciseRecordWithIdsType = z.infer<typeof exerciseRecordSchema>
