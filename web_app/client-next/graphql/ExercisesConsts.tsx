import { gql } from "@apollo/client";

// Querries
export const GET_EXERCISES = gql`
  query {
    Exercises {
      id
      name
      description
      musclesTargeted
      equipmentRequired
      isCustom
    }
  }
`;


// Mutations
export const CREATE_EXERCISE = gql`
  mutation CreateExercise($name: String!, $description: String!, $musclesTargeted: String!, $equipmentRequired: String!) {
    createExercise(name: $name, description: $description, musclesTargeted: $musclesTargeted, equipmentRequired: $equipmentRequired) {
      id
      name
      description
      musclesTargeted
      equipmentRequired
      isCustom
    }
  }
`;


// Interfaces
export interface Exercise {
    id: string;
    name: string;
    description: string;
    musclesTargeted: string;
    equipmentRequired: string;
  }
