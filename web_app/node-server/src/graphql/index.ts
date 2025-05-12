import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers
import userResolvers from "./Resolvers/UserResolvers";
import exerciseResolvers from "./Resolvers/ExerciseResolvers";
import plannedWorkoutResolvers from "./Resolvers/PlannedWorkoutResolvers";
import workoutDayResolvers from "./Resolvers/WorkoutDayResolvers";
import calendarDayResolvers from "./Resolvers/CalendarDayResolvers";
import exerciseRecordsResolvers from "./Resolvers/ExerciseRecordsResolvers";
import recordSetResolvers from "./Resolvers/RecordSetResolvers";
import appleWatchResolvers from "./Resolvers/AppleWatchResolvers";
import {
  weightRecommendationResolver,
  workoutCreatorResolver,
} from "./Resolvers/AiCallsResolvers";
import userProfileResolvers from "./Resolvers/UserProfileResolvers";
import dashboardMetricsResolver from "./Resolvers/DashboardMetricsResolver";
import plannedExerciseResolvers from "./Resolvers/PlannedExerciseResolvers";
import communitySectionResolvers from "./Resolvers/CommunitySectionResolvers";

// TypeDefs
import userTypeDefs from "./TypeDefs/UserTypeDefs";
import exerciseTypeDefs from "./TypeDefs/ExerciseTypeDefs";
import plannedWorkoutTypeDefs from "./TypeDefs/PlannedWorkoutTypeDefs";
import workoutDayTypeDefs from "./TypeDefs/WorkoutDayTypeDefs";
import calendarDayTypeDefs from "./TypeDefs/CalendarDayTypeDefs";
import exerciseRecordsTypeDefs from "./TypeDefs/ExerciseRecordsTypeDefs";
import recordSetTypeDefs from "./TypeDefs/RecordSetTypeDefs";
import {
  UpdateInputsTypeDefs,
  CreateInputsTypeDefs,
} from "./TypeDefs/InputsTypeDefs";
import { TypesTypeDefs, EnumTypeDefs } from "./TypeDefs/TypesTypeDefs";
import userProfileTypeDefs from "./TypeDefs/UserProfileTypeDefs";
import appleWatchTypeDefs from "./TypeDefs/AppleWatchTypeDefs";
import aiTypeDefs from "./TypeDefs/AiTypeDefs";
import dashboardMetricsTypeDefs from "./TypeDefs/DashboardMetricsTypeDefs";
import plannedExerciseTypeDefs from "./TypeDefs/PlannedExerciseTypeDefs";
import communitySectionTypeDefs from "./TypeDefs/CommunitySectionTypeDefs";

const schema = makeExecutableSchema({
  typeDefs: [
    UpdateInputsTypeDefs,
    TypesTypeDefs,
    EnumTypeDefs,
    CreateInputsTypeDefs,
    userTypeDefs,
    exerciseTypeDefs,
    plannedWorkoutTypeDefs,
    workoutDayTypeDefs,
    calendarDayTypeDefs,
    exerciseRecordsTypeDefs,
    recordSetTypeDefs,
    userProfileTypeDefs,
    appleWatchTypeDefs,
    aiTypeDefs,
    dashboardMetricsTypeDefs,
    plannedExerciseTypeDefs,
    communitySectionTypeDefs,
  ],
  resolvers: [
    userResolvers,
    exerciseResolvers,
    plannedWorkoutResolvers,
    workoutDayResolvers,
    calendarDayResolvers,
    exerciseRecordsResolvers,
    recordSetResolvers,
    userProfileResolvers,
    appleWatchResolvers,
    weightRecommendationResolver,
    workoutCreatorResolver,
    dashboardMetricsResolver,
    plannedExerciseResolvers,
    communitySectionResolvers,
  ],
});

export { schema };
