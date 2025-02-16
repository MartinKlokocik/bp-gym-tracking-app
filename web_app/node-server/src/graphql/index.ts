import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers
import userResolvers from "./Resolvers/UserResolvers";

import exercisesResolvers from "./Resolvers/ExercisesResolvers";

// TypeDefs
import userTypeDefs from "./TypeDefs/UserTypeDefs";

import exercisesTypeDefs from "./TypeDefs/ExercisesTypeDefs";

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, exercisesTypeDefs],
  resolvers: [userResolvers, exercisesResolvers],
});

export { schema };
