import { gql } from '@apollo/client'

export const UPDATE_WEIGHT_IN_SET_RECORD = gql`
  mutation UpdateWeightInSetRecord($setId: String!, $weight: Float!) {
    updateWeightInSetRecord(setId: $setId, weight: $weight) {
      id
      weight
    }
  }
`

export const UPDATE_REPS_IN_SET_RECORD = gql`
  mutation UpdateRepsInSetRecord($setId: String!, $reps: Int!) {
    updateRepsInSetRecord(setId: $setId, reps: $reps) {
      id
      reps
    }
  }
`
