import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers
import userResolvers from "./Resolvers/UserResolvers";
import exerciseResolvers from "./Resolvers/ExerciseResolvers";
import plannedWorkoutResolvers from "./Resolvers/PlannedWorkoutResolvers";

// TypeDefs
import userTypeDefs from "./TypeDefs/UserTypeDefs";
import exerciseTypeDefs from "./TypeDefs/ExerciseTypeDefs";
import plannedWorkoutTypeDefs from "./TypeDefs/PlannedWorkoutTypeDefs";

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, exerciseTypeDefs, plannedWorkoutTypeDefs],
  resolvers: [userResolvers, exerciseResolvers, plannedWorkoutResolvers],
});

export { schema };
