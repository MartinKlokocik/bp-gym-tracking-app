const TypesTypeDefs = `
  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: String!
  }

  type Exercise {
    id: String!
    userId: String!
    name: String!
    description: String!
    muscleGroup: String!
    equipment: [String]!
    image: String
    isPublic: Boolean!
    isDefault: Boolean!
    type: String!
  }

  type PlannedSet {
    id: String!
    reps: Int!
    restTime: Int
    setNumber: Int!
  }

  type PlannedExercise {
    id: String!
    userId: String!
    exerciseId: String!
    exercise: Exercise!
    notes: String
    plannedSets: [PlannedSet!]!
  }

  type PlannedWorkoutDay {
    id: String!
    userId: String!
    name: String!
    plannedExercises: [PlannedExercise!]!
  }

  type PlannedWorkout {
    id: String!
    userId: String!
    name: String!
    schema: String!
    isActive: Boolean!
    isPublic: Boolean!
    days: [PlannedWorkoutDay!]!
  }

  type CalendarDay {
    id: String!
    userId: String!
    date: String!
    plannedWorkoutDayId: String!
    plannedWorkoutDay: PlannedWorkoutDay!
  }

  type RecordSet {
    id: String!
    reps: Int!
    weight: Float!
    restTime: Int
    setNumber: Int!
  }

  type ExerciseRecord {
    id: String!
    userId: String!
    exerciseId: String!
    recordSets: [RecordSet!]!  
    date: String!
    notes: String
    status: RecordStatus!
  }
`;

const EnumTypeDefs = `
  enum RecordStatus {
    PENDING
    COMPLETED
    SKIPPED
  }
`;

export { TypesTypeDefs, EnumTypeDefs };
