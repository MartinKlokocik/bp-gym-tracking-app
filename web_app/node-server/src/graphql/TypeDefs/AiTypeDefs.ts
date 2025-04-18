const aiTypeDefs = `
  type SetRecommendation {
    setNumber: Int!
    weight: Float!
    reps: Int!
    restTime: Int
  }

  type WeightOptimizationResponse {
    sets: [SetRecommendation!]!
    comments: String
  }

  type Query {
    getWeightRecommendation(
      exerciseRecordId: String!
    ): String
  }
`;

export default aiTypeDefs;
