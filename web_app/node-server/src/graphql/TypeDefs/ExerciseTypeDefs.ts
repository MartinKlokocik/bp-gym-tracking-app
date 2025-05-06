const exercisesTypeDefs = `
  type Query {
    getAllExercises(userId: String!): [Exercise!]!
    getExerciseById(id: String!): Exercise!
  }

  type Mutation {
    createExercise(userId: String!, name: String!, description: String!, muscleGroup: String!, equipment: [String]!, image: String, isPublic: Boolean!, isDefault: Boolean!, type: String!): Exercise!
  }
`;

export default exercisesTypeDefs;
