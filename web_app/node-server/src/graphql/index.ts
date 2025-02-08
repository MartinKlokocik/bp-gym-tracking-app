import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers
import usersResolvers from "./Resolvers/UsersResolvers";
import exercisesResolvers from "./Resolvers/ExercisesResolvers";
import trainingPlansResolvers from "./Resolvers/TrainingPlansResolvers";

// TypeDefs
import usersTypeDefs from "./TypeDefs/UsersTypeDefs";
import exercisesTypeDefs from "./TypeDefs/ExercisesTypeDefs";
import trainingPlansTypeDefs from "./TypeDefs/TrainingPlansTypeDefs";

const schema = makeExecutableSchema({
    typeDefs: [usersTypeDefs, exercisesTypeDefs, trainingPlansTypeDefs],
    resolvers: [usersResolvers, exercisesResolvers, trainingPlansResolvers],
  });

export { schema };
