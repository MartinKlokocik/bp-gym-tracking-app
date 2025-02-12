import {
  CalendarDay,
  Exercise,
  ExerciseRecord,
  PlannedWorkoutDay,
} from './types'
import { dummyCalendarDays, dummyExerciseRecords } from './DummyData'
import { isSameDay } from 'date-fns'

export const getCalendarDay = (date: Date) => {
  return dummyCalendarDays.find(calendarDay =>
    isSameDay(calendarDay.date, date)
  )
}

export const getPlannedWorkoutDay = (calendarDay: CalendarDay) => {
  return calendarDay.workout
}

export const getPlannedExercise = (plannedWorkoutDay: PlannedWorkoutDay) => {
  return plannedWorkoutDay.exercises
}

export const getLatestExerciseRecord = (
  exercise: Exercise | null,
  exerciseRecords: ExerciseRecord[] = dummyExerciseRecords
): ExerciseRecord | null => {
  if (!exercise) return null

  const filteredRecords = exerciseRecords
    .filter(record => record.exercise.id === exercise.id)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return filteredRecords.length > 0 ? filteredRecords[0] : null
}

export const getExerciseRecords = (exercise: Exercise | undefined) => {
  if (!exercise) return []
  return dummyExerciseRecords.filter(
    record => record.exercise.id === exercise.id
  )
}
