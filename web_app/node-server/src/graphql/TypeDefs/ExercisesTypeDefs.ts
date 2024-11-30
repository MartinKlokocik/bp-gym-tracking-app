const exercisesTypeDefs = `
  type Exercise {
    id: ID!
    name: String!
    description: String!
    musclesTargeted: String!
    equipmentRequired: String!
    isCustom: String!
  }

  type Query {
    Exercises: [Exercise!]!
  }

  type Mutation {
    createExercise(name: String!, description: String!, musclesTargeted: String!, equipmentRequired: String!): Exercise!
  }
`;


export default exercisesTypeDefs;
