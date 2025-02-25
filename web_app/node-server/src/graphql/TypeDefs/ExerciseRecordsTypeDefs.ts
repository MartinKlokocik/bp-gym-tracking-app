const ExerciseRecordsTypeDefs = `
type RecordSet {
  id: String!
  reps: Int!
  weight: Float!
  restTime: Int
}


type ExerciseRecord {
  id: String!
  userId: String!
  exerciseId: String!
  recordSets: [RecordSet!]!  
  date: String!
  notes: String
}

type Query {
  getAllUserExerciseRecordsForExercise(exerciseId: String!, userId: String!): [ExerciseRecord!]!
  getLatestExerciseRecord(exerciseId: String!, userId: String!, date: String!): ExerciseRecord
  getRecordForThisExerciseAndDate(exerciseId: String!, date: String!, userId: String!): ExerciseRecord
}
`;

export default ExerciseRecordsTypeDefs;
