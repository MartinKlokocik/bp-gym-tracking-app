import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($userId: String!, $data: UserProfileUpdateInput!) {
    updateUserProfile(userId: $userId, data: $data) {
      id
      firstName
      lastName
      dateOfBirth
      gender
      profilePicture
      height
      weight
      fitnessLevel
      yearsOfExperience
      primaryGoal
      secondaryGoals
      preferredWorkoutDays
      workoutDuration
      availableEquipment
      healthIssues
      injuries
    }
  }
`

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      id
      firstName
      lastName
      dateOfBirth
      gender
      profilePicture
      height
      weight
      fitnessLevel
      yearsOfExperience
      primaryGoal
      secondaryGoals
      preferredWorkoutDays
      workoutDuration
      availableEquipment
      healthIssues
      injuries
    }
  }
`
