import { gql } from '@apollo/client'

export const GET_WEIGHT_RECOMMENDATION = gql`
  query GetWeightRecommendation($exerciseRecordId: String!) {
    getWeightRecommendation(exerciseRecordId: $exerciseRecordId)
  }
`
