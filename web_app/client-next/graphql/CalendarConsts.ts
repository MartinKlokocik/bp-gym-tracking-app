import { gql } from '@apollo/client'

export const CREATE_CALENDAR_DAY = gql`
  mutation CreateCalendarDay($input: CalendarDayInput!) {
    createCalendarDay(input: $input) {
      id
      userId
      date
      plannedWorkoutDayId
    }
  }
`
