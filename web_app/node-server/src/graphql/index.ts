import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers
import userResolvers from "./Resolvers/UserResolvers";
import exerciseResolvers from "./Resolvers/ExerciseResolvers";
import plannedWorkoutResolvers from "./Resolvers/PlannedWorkoutResolvers";
import workoutDayResolvers from "./Resolvers/WorkoutDayResolvers";
import calendarDayResolvers from "./Resolvers/CalendarDayResolvers";
// TypeDefs
import userTypeDefs from "./TypeDefs/UserTypeDefs";
import exerciseTypeDefs from "./TypeDefs/ExerciseTypeDefs";
import plannedWorkoutTypeDefs from "./TypeDefs/PlannedWorkoutTypeDefs";
import workoutDayTypeDefs from "./TypeDefs/WorkoutDayTypeDefs";
import calendarDayTypeDefs from "./TypeDefs/CalendarDayTypeDefs";

const schema = makeExecutableSchema({
  typeDefs: [
    userTypeDefs,
    exerciseTypeDefs,
    plannedWorkoutTypeDefs,
    workoutDayTypeDefs,
    calendarDayTypeDefs,
  ],
  resolvers: [
    userResolvers,
    exerciseResolvers,
    plannedWorkoutResolvers,
    workoutDayResolvers,
    calendarDayResolvers,
  ],
});

export { schema };
