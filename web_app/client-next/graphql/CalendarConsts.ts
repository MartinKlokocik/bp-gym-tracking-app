import { gql } from '@apollo/client'

export const GET_CALENDAR_DAY_BY_DATE = gql`
  query GetCalendarDayByDate($date: String!, $userId: String!) {
    getCalendarDayByDate(date: $date, userId: $userId) {
      id
      userId
      date
      plannedWorkoutDay {
        id
        name
        plannedExercises {
          id
          exerciseNumber
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
            setNumber
          }
        }
      }
    }
  }
`

export const CREATE_CALENDAR_DAY = gql`
  mutation CreateCalendarDay($input: CalendarDayCreateInput!) {
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
          exerciseNumber
          plannedSets {
            id
            reps
            restTime
            setNumber
          }
        }
      }
    }
  }
`

export const DELETE_CALENDAR_DAY = gql`
  mutation DeleteCalendarDay($date: String!) {
    deleteCalendarDay(date: $date)
  }
`
