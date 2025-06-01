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
  getWorkoutForToday(deviceUUID: String!): WatchesWorkout
  isDevicePaired(deviceUUID: String!): Boolean
  isUserPaired(userId: String!): Boolean
}
type Mutation {
  sendPulseData(avgPulse: Int!, exerciseIndex: Int!, setIndex: Int!, exerciseId: String!, deviceUUID: String!, calendarDayId: String!): Boolean
  pairDevice(deviceUUID: String!, userId: String!): Boolean
  unpairUser(userId: String!): Boolean
}
`;

export default AppleWatchTypeDefs;
