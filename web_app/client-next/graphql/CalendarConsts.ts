import { gql } from '@apollo/client'

export const GET_CALENDAR_DAY_BY_DATE = gql`
  query GetCalendarDayByDate($date: String!) {
    getCalendarDayByDate(date: $date) {
      id
      userId
      date
      plannedWorkoutDay {
        id
        name
        plannedExercises {
          id
          exercise {
            id
            name
            muscleGroup
            equipment
            image
            isPublic
            isDefault
            type
          }
          notes
          plannedSets {
            id
            reps
            restTime
          }
        }
      }
    }
  }
`

export const CREATE_CALENDAR_DAY = gql`
  mutation CreateCalendarDay($input: CalendarDayInput!) {
    createCalendarDay(input: $input) {
      id
      userId
      date
      plannedWorkoutDay {
        id
        userId
        name
        plannedExercises {
          id
          userId
          exerciseId
          plannedSets {
            id
            reps
            restTime
          }
        }
      }
    }
  }
`
