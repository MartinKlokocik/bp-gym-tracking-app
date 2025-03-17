const ExerciseRecordsTypeDefs = `
  type Query {
    getAllUserExerciseRecordsForExercise(exerciseId: String!, userId: String!): [ExerciseRecord!]!
    getLatestExerciseRecord(exerciseId: String!, userId: String!, date: String!): ExerciseRecord
    getRecordForThisExerciseAndDate(exerciseId: String!, date: String!, userId: String!): ExerciseRecord
  }
`;

export default ExerciseRecordsTypeDefs;
