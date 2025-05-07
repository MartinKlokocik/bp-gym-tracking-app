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
      date
      userId
      exerciseId
      notes
      status
      recordSets {
        id
        reps
        weight
        restTime
        setNumber
      }
    }
  }
`

export const GET_LATEST_EXERCISE_RECORD = gql`
  query GetLatestExerciseRecord(
    $exerciseId: String!
    $userId: String!
    $date: String!
  ) {
    getLatestExerciseRecord(
      exerciseId: $exerciseId
      userId: $userId
      date: $date
    ) {
      id
      date
      userId
      exerciseId
      notes
      status
      recordSets {
        id
        reps
        weight
        restTime
        setNumber
      }
    }
  }
`

export const GET_RECORD_FOR_THIS_EXERCISE_AND_DATE = gql`
  query GetRecordForThisExerciseAndDate(
    $exerciseId: String!
    $date: String!
    $userId: String!
  ) {
    getRecordForThisExerciseAndDate(
      exerciseId: $exerciseId
      date: $date
      userId: $userId
    ) {
      id
      date
      userId
      status
      notes
      recordSets {
        id
        reps
        weight
        restTime
        setNumber
      }
    }
  }
`

export const UPDATE_EXERCISE_RECORD_STATUS = gql`
  mutation UpdateExerciseRecordStatus($id: String!, $status: RecordStatus!) {
    updateExerciseRecordStatus(id: $id, status: $status) {
      id
      status
    }
  }
`

export const UPDATE_EXERCISE_RECORD_NOTES = gql`
  mutation UpdateExerciseRecordNotes($id: String!, $notes: String!) {
    updateExerciseRecordNotes(id: $id, notes: $notes) {
      id
      notes
    }
  }
`
