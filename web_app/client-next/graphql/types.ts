import { CalendarDayWithIdsType } from '../types/CalendarDay'
import { ExerciseWithIdsType } from '../types/Exercise'

export type GetAllExercisesQuery = {
  getAllExercises: ExerciseWithIdsType[]
}

export type GetCalendarDayByDateQuery = {
  getCalendarDayByDate: CalendarDayWithIdsType
}

export type GetCalendarDayByDateQueryVariables = {
  date: string
  userId: string
}
