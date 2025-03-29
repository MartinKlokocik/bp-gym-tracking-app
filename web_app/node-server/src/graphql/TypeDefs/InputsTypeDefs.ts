const UpdateInputsTypeDefs = `
  input PlannedSetUpdateInput {
    id: String!
    reps: Int!
    restTime: Int
    setNumber: Int!
  }

  input PlannedExerciseUpdateInput {
    id: String!
    userId: String!
    exerciseId: String!
    plannedSets: [PlannedSetUpdateInput!]!
  }

  input PlannedWorkoutDayUpdateInput {
    id: String!
    userId: String!
    name: String!
    plannedExercises: [PlannedExerciseUpdateInput!]!
  }

  input ExerciseUpdateInput {
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
`;

const CreateInputsTypeDefs = `
  input PlannedSetCreateInput {
    reps: Int!
    restTime: Int
    setNumber: Int!
  }

  input PlannedExerciseCreateInput {
    userId: String!
    exerciseId: String!
    notes: String
    exerciseNumber: Int!
    plannedSets: [PlannedSetCreateInput!]!
  }

  input PlannedWorkoutDayCreateInput {
    userId: String!
    name: String!
    plannedExercises: [PlannedExerciseCreateInput!]!
  }

  input PlannedWorkoutCreateInput {
    userId: String!
    name: String!
    schema: String
    isActive: Boolean!
    isPublic: Boolean!
    days: [PlannedWorkoutDayCreateInput!]!
  }

  input CalendarDayCreateInput {
    userId: String!
    date: String!
    plannedWorkoutDay: PlannedWorkoutDayUpdateInput!
  }
`;

export {UpdateInputsTypeDefs, CreateInputsTypeDefs}