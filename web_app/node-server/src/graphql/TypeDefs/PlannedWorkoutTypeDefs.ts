const PlannedWorkoutTypeDefs = `
  type Query {
    getAllPlannedWorkouts(userId: String!): [PlannedWorkout!]!
    getWorkoutPlanById(id: String!): PlannedWorkout!
  }

  type Mutation {
    createPlannedWorkout(input: PlannedWorkoutCreateInput!): PlannedWorkout!
    deletePlannedWorkout(id: String!): PlannedWorkout!
  }
`;

export default PlannedWorkoutTypeDefs;
