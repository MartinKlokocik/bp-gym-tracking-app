const recordSetTypeDefs = `
  type RecordSet {
    id: String!
    weight: Float!
    reps: Int!
  }

  type Mutation {
    updateWeightInSetRecord(setId: String!, weight: Float!): RecordSet!
    updateRepsInSetRecord(setId: String!, reps: Int!): RecordSet!
  }
`;

export default recordSetTypeDefs;