import { gql } from '@apollo/client'

export const GET_ALL_USER_EXERCISE_RECORDS_FOR_EXERCISE = gql`
  query GetAllUserExerciseRecordsForExercise(
    $exerciseId: String!
    $userId: String!
  ) {
    getAllUserExerciseRecordsForExercise(
      exerciseId: $exerciseId
      userId: $userId
    ) {
      id
      userId
      exerciseId
      recordSets {
        id
        reps
        weight
        restTime
      }
      calendarDay {
        id
        date
      }
    }
  }
`
