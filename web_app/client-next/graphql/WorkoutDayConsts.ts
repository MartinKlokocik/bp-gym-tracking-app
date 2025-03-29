import { gql } from '@apollo/client'

export const GET_WORKOUT_DAY_BY_ID = gql`
  query GetWorkoutDayById($id: String!) {
    getWorkoutDayById(id: $id) {
      id
      userId
      name
      plannedExercises {
        id
        userId
        notes
        exerciseNumber
        exercise {
          id
          userId
          name
          description
          muscleGroup
          equipment
          image
          isPublic
          isDefault
          type
        }
        plannedSets {
          id
          reps
          restTime
          setNumber
        }
      }
    }
  }
`
