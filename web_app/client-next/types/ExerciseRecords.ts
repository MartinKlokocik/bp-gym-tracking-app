import { z } from 'zod'

export const recordSetSchema = z.object({
  id: z.string(),
  reps: z.number(),
  weight: z.number(),
  restTime: z.number(),
  setNumber: z.number(),
})

export const exerciseRecordSchema = z.object({
  userId: z.string(),
  exerciseId: z.string(),
  recordSets: z.array(recordSetSchema),
  date: z.string(),
  notes: z.string(),
})

export type ExerciseRecordWithIdsType = z.infer<typeof exerciseRecordSchema>
export type RecordSetWithIdsType = z.infer<typeof recordSetSchema>
