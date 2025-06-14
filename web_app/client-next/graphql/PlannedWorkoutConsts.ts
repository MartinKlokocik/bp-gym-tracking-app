import { gql } from '@apollo/client'

export const GET_ALL_PLANNED_WORKOUTS = gql`
  query GetAllPlannedWorkouts($userId: String!) {
    getAllPlannedWorkouts(userId: $userId) {
      id
      userId
      name
      schema
      isActive
      isPublic
      days {
        id
        userId
        name
        plannedExercises {
          id
          userId
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
          notes
          plannedSets {
            id
            reps
            restTime
            setNumber
          }
        }
      }
    }
  }
`

export const GET_PLANNED_WORKOUT_BY_ID = gql`
  query GetPlannedWorkoutById($id: String!) {
    getWorkoutPlanById(id: $id) {
      id
      userId
      name
      schema
      isActive
      isPublic
      days {
        userId
        id
        name
        plannedExercises {
          userId
          id
          exerciseNumber
          notes
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
  }
`

export const CREATE_PLANNED_WORKOUT = gql`
  mutation CreatePlannedWorkout($input: PlannedWorkoutCreateInput!) {
    createPlannedWorkout(input: $input) {
      id
      userId
      name
      schema
      isActive
      isPublic
      days {
        id
        name
        plannedExercises {
          id
          exerciseNumber
          notes
          exerciseId
          plannedSets {
            id
            reps
            restTime
            setNumber
          }
        }
      }
    }
  }
`

export const DELETE_PLANNED_WORKOUT = gql`
  mutation DeletePlannedWorkout($id: String!) {
    deletePlannedWorkout(id: $id) {
      id
      name
    }
  }
`
