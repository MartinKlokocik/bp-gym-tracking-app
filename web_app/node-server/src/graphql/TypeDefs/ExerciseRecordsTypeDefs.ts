const ExerciseRecordsTypeDefs = `
type CalendarDay {
  id: String!
  date: String!
}

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
  calendarDay: CalendarDay!
}

type Query {
  getAllUserExerciseRecordsForExercise(exerciseId: String!, userId: String!): [ExerciseRecord!]!
}
`;

export default ExerciseRecordsTypeDefs;
