import { getWeightRecommendation } from "../../ai/weightOptimalizationAi";

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
