import { gql } from '@apollo/client'

export const GET_WEIGHT_RECOMMENDATION = gql`
  query GetWeightRecommendation($exerciseRecordId: String!) {
    getWeightRecommendation(exerciseRecordId: $exerciseRecordId)
  }
`

export const GENERATE_WORKOUTS = gql`
  query GenerateWorkouts(
    $additionalInformations: String!
    $userId: String!
    $useProfileData: Boolean
  ) {
    generateWorkouts(
      additionalInformations: $additionalInformations
      userId: $userId
      useProfileData: $useProfileData
    )
  }
`
