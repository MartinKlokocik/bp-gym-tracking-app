import { gql } from '@apollo/client'

export const UPDATE_PLANNED_EXERCISE_NOTES = gql`
  mutation UpdatePlannedExerciseNotes($id: String!, $notes: String!) {
    updatePlannedExerciseNotes(id: $id, notes: $notes) {
      id
      notes
    }
  }
`
