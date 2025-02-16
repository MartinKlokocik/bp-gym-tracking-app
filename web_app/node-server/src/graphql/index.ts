import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers
import userResolvers from "./Resolvers/UserResolvers";
import exerciseResolvers from "./Resolvers/ExerciseResolvers";

// TypeDefs
import userTypeDefs from "./TypeDefs/UserTypeDefs";
import exerciseTypeDefs from "./TypeDefs/ExerciseTypeDefs";

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, exerciseTypeDefs],
  resolvers: [userResolvers, exerciseResolvers],
});

export { schema };
