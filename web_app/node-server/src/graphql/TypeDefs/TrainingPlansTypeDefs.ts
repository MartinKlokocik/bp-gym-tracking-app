const trainingPlansTypeDefs = `
  type TrainingPlan {
    id: ID!
    name: String!
    description: String!
    isPublic: Boolean!
    user: User
    planExercises: [PlanExercise!]!
    calendars: [Calendar!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type PlanExercise {
    id: ID!
    exerciseId: Int!
    sets: Int!
    reps: Int!
    weight: Float!
    restTimeSeconds: Int!
  }

  type Calendar {
    id: ID!
    date: String!
    notes: String
  }

  input CreatePlanExerciseInput {
    exerciseId: Int!
    sets: Int!
    reps: Int!
    weight: Float!
    restTimeSeconds: Int!
  }

  input CreateCalendarInput {
    date: String!
    notes: String
  }

  input CreateTrainingPlanInput {
    name: String!
    description: String!
    isPublic: Boolean!
    userId: ID!
    planExercises: [CreatePlanExerciseInput!]!
    calendars: [CreateCalendarInput!]!
  }

  type Query {
    TrainingPlans: [TrainingPlan!]!
  }

  type Mutation {
    createTrainingPlan(input: CreateTrainingPlanInput!): TrainingPlan!
  }
`;

export default trainingPlansTypeDefs;
