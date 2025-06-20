import { gql } from '@apollo/client'

// Querries
export const GET_ALL_EXERCISES = gql`
  query GetAllExercises($userId: String!) {
    getAllExercises(userId: $userId) {
      id
      userId
      name
      description
      type
      muscleGroup
      equipment
      image
      isPublic
      isDefault
    }
  }
`

export const GET_EXERCISE_BY_ID = gql`
  query GetExerciseById($id: String!) {
    getExerciseById(id: $id) {
      id
      userId
      name
      description
      type
      muscleGroup
      equipment
      image
      isPublic
      isDefault
    }
  }
`

// Mutations
export const CREATE_EXERCISE = gql`
  mutation CreateExercise(
    $name: String!
    $userId: String!
    $description: String!
    $type: String!
    $muscleGroup: String!
    $equipment: [String]!
    $image: String
    $isPublic: Boolean!
    $isDefault: Boolean!
  ) {
    createExercise(
      name: $name
      userId: $userId
      description: $description
      type: $type
      muscleGroup: $muscleGroup
      equipment: $equipment
      image: $image
      isPublic: $isPublic
      isDefault: $isDefault
    ) {
      id
      userId
      name
      description
      type
      muscleGroup
      equipment
      image
      isPublic
      isDefault
    }
  }
`
