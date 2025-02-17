const exercisesTypeDefs = `
  type Exercise {
    id: ID!
    userId: ID!
    name: String!
    description: String!
    muscleGroup: String!
    equipment: [String]!
    image: String
    isPublic: Boolean!
    isDefault: Boolean!
    type: String!
  }

  type Query {
    getAllExercises: [Exercise!]!
  }

  type Mutation {
    createExercise(userId: String!, name: String!, description: String!, muscleGroup: String!, equipment: [String]!, image: String, isPublic: Boolean!, isDefault: Boolean!, type: String!): Exercise!
  }
`;

export default exercisesTypeDefs;
