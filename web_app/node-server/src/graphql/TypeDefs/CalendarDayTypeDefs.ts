const CalendarDayTypeDefs = `
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

  type CalendarDay {
    id: String!
    userId: String!
    date: String!
    plannedWorkoutDayId: String!
    plannedWorkoutDay: PlannedWorkoutDay!
  }

  input CalendarDayInput {
    userId: String!
    date: String!
    plannedWorkoutDayId: String!
  }

  type Query {
    getCalendarDayByDate(date: String!): CalendarDay
  }

  type Mutation {
    createCalendarDay(input: CalendarDayInput!): CalendarDay!
  }
`;

export default CalendarDayTypeDefs;
