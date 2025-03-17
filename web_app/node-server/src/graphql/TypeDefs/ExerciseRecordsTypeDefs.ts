const ExerciseRecordsTypeDefs = `
  type Query {
    getAllUserExerciseRecordsForExercise(exerciseId: String!, userId: String!): [ExerciseRecord!]!
    getLatestExerciseRecord(exerciseId: String!, userId: String!, date: String!): ExerciseRecord
    getRecordForThisExerciseAndDate(exerciseId: String!, date: String!, userId: String!): ExerciseRecord
  }
  type Mutation {
    updateExerciseRecordStatus(id: String!, status: RecordStatus!): ExerciseRecord
  }
`;

export default ExerciseRecordsTypeDefs;
