const PlannedWorkoutTypeDefs = `
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

type PlannedWorkout {
  id: String!
  userId: String!
  name: String!
  schema: String!
  isActive: Boolean!
  isPublic: Boolean!
  days: [PlannedWorkoutDay!]!
}

input ExerciseInput {
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

input PlannedSetInput {
  reps: Int!
  restTime: Int
}

input PlannedExerciseInput {
  userId: String!
  exerciseId: String!
  notes: String
  plannedSets: [PlannedSetInput!]!
}

input PlannedWorkoutDayInput {
  userId: String!
  name: String!
  plannedExercises: [PlannedExerciseInput!]!
}

input CreatePlannedWorkoutInput {
  userId: String!
  name: String!
  schema: String
  isActive: Boolean!
  isPublic: Boolean!
  days: [PlannedWorkoutDayInput!]!
}

type Query {
  getAllPlannedWorkouts: [PlannedWorkout!]!
  getWorkoutPlanById(id: String!): PlannedWorkout!
}

type Mutation {
  createPlannedWorkout(input: CreatePlannedWorkoutInput!): PlannedWorkout!
}
`;

export default PlannedWorkoutTypeDefs;
