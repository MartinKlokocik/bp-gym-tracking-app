import { isSameDay } from 'date-fns'

import {
  dummyCalendarDays,
  dummyExerciseRecords,
  dummyExercises,
  dummyPlannedWorkoutDays,
  dummyPlannedWorkouts,
} from './DummyData'
import {
  CalendarDay,
  Exercise,
  ExerciseRecord,
  PlannedWorkout,
  PlannedWorkoutDay,
} from './types'

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

export const getExerciseById = (exerciseId: string) => {
  return dummyExercises.find(exercise => exercise.id === exerciseId)
}

export const getActiveWorkoutPlan = (workoutPlans: PlannedWorkout[]) => {
  return workoutPlans?.find(workout => workout.isActive)
}

export const getWorkoutPlanById = (workoutPlanId: string) => {
  return dummyPlannedWorkouts.find(workout => workout.id === workoutPlanId)
}

export const getWorkoutDayById = (workoutDayId: string) => {
  return dummyPlannedWorkoutDays.find(day => day.id === workoutDayId)
}
