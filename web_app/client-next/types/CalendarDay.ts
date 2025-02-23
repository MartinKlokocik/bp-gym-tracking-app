import { z } from 'zod'

import { plannedWorkoutDaySchemaWithId } from './WorkoutPlanning'

export const calendarDaySchema = z.object({
  userId: z.string(),
  date: z.string(),
  plannedWorkoutDay: plannedWorkoutDaySchemaWithId,
})

export type CalendarDayWithIdsType = z.infer<typeof calendarDaySchema>
