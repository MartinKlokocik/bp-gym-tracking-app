const recordSetTypeDefs = `
  type Mutation {
    updateWeightInSetRecord(setId: String!, weight: Float!): RecordSet!
    updateRepsInSetRecord(setId: String!, reps: Int!): RecordSet!
  }
`;

export default recordSetTypeDefs;