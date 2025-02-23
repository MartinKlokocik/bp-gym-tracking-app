import { z } from 'zod'

export const calendarDaySchema = z.object({
  userId: z.string(),
  date: z.string(),
  plannedWorkoutDayId: z.string(),
})

export type CalendarDay = z.infer<typeof calendarDaySchema>
