import { makeExecutableSchema } from "@graphql-tools/schema";

import usersTypeDefs from "./TypeDefs/UsersTypeDefs";
import usersResolvers from "./Resolvers/UsersResolvers";
import exercisesResolvers from "./Resolvers/ExercisesResolvers";
import exercisesTypeDefs from "./TypeDefs/ExercisesTypeDefs";


const schema = makeExecutableSchema({
    typeDefs: [usersTypeDefs, exercisesTypeDefs],
    resolvers: [usersResolvers, exercisesResolvers],
  });

export { schema };
