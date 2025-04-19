import { getWeightRecommendation } from "../../ai/weightOptimalizationAi";
import { generateWorkouts } from "../../ai/workoutCreatorAi";

export const weightRecommendationResolver = {
  Query: {
    getWeightRecommendation: async (
      _: unknown,
      { exerciseRecordId }: { exerciseRecordId: string }
    ) => {
      try {
        const result = await getWeightRecommendation(exerciseRecordId);
        return result;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get weight recommendation");
      }
    },
  },
};

export const workoutCreatorResolver = {
  Query: {
    generateWorkouts: async (
      _: unknown,
      {
        additionalInformations,
        userId,
        useProfileData,
      }: {
        additionalInformations: string;
        userId: string;
        useProfileData: boolean;
      }
    ) => {
      try {
        const result = await generateWorkouts(
          additionalInformations,
          userId,
          useProfileData
        );
        return result;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to generate workouts");
      }
    },
  },
};
