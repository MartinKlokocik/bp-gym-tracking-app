const exercisesTypeDefs = `
  type Exercise {
    id: ID!
    userId: ID!
    name: String!
    description: String!
    muscleGroup: String!
    equipment: [String!]!
    image: String
    isPublic: Boolean!
    isDefault: Boolean!
  }

  type Query {
    getAllExercises: [Exercise!]!
  }

  type Mutation {
    createExercise(userId: ID!, name: String!, description: String!, muscleGroup: String!, equipment: [String!]!, image: String, isPublic: Boolean!, isDefault: Boolean!): Exercise!
  }
`;

export default exercisesTypeDefs;
