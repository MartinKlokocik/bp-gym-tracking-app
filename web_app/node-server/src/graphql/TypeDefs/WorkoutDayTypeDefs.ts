const WorkoutDayTypeDefs = `
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

type Query {
  getWorkoutDayById(id: String!): PlannedWorkoutDay!
}
`;

export default WorkoutDayTypeDefs;
