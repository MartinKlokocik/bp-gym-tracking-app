const DashboardMetricsTypeDefs = `
  type VolumeLiftedInWeek {
    weekLabel: String!
    dateFrom: String!
    dateTo: String!
    volume: Int!
  }

  type RecentPR {
    exerciseName: String!
    weight: Int!
    date: String!
  }

  type MuscleGroupFocus {
    muscleGroup: String!
    count: Int!
  }

  type ProgressionCurve {
    exerciseName: String!
    weights: [Int!]!
  }

  type WorkoutCompletionRate {
    weekLabel: String!
    dateFrom: String!
    dateTo: String!
    numberOfCompletedExercises: Int!
    numberOfSkipped: Int!
    numberOfPending: Int!
  }

  type DashboardMetrics {
    last7DaysConsistency: Int!
    volumeLiftedInWeeks: [VolumeLiftedInWeek!]!
    recentPRs: [RecentPR!]!
    muscleGroupsFocus: [MuscleGroupFocus!]!
    progressionCurve: [ProgressionCurve!]!
    workoutCompletionRate: [WorkoutCompletionRate!]!
  }

  type Query {
    getDashboardMetrics(userId: String!): DashboardMetrics!
  }
`;

export default DashboardMetricsTypeDefs;
