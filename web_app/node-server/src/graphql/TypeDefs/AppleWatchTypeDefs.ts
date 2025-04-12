const AppleWatchTypeDefs = `

type WatchesPlannedSet {
  reps: Int
  restTime: Int
}

type WatchesExercise {
  id: String
  name: String
}

type WatchesPlannedExercise {
  exercise: WatchesExercise
  plannedSets: [WatchesPlannedSet]
}

type WatchesWorkoutDay {
  name: String
  plannedExercises: [WatchesPlannedExercise]
}

type WatchesWorkout {
  id: String
  plannedWorkoutDay: WatchesWorkoutDay
}

type Query {
  getWorkoutForToday(userId: String!): WatchesWorkout
}
type Mutation {
  sendPulseData(pulseData: Int!): Boolean
}
`;

export default AppleWatchTypeDefs;
