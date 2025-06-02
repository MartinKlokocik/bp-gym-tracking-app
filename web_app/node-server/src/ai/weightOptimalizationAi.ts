import { getDataForWeightOptimalization } from "./getDataForWeightOptimalization";

const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const { getJsonForPrompt } = require("./getDataForWeightOptimalization");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getWeightOptimizationAi(
  latestRecord: any,
  previousWorkouts: any[],
  exerciseName: string,
  userData: any
) {
  try {
    if (!latestRecord?.recordSets?.length) {
      return {
        error: "No previous workouts data",
      };
    }

    const jsonSchema = getJsonForPrompt(latestRecord?.recordSets?.length || 3);

    const systemPrompt = `
        You are an elite strength coach with deep expertise in:
        - Progressive overload
        - Fatigue management
        - Exercise-specific strategies
        - Body composition goals (weight loss, muscle gain, etc.)

        You have a user with these stats:
        ${JSON.stringify(userData, null, 2)}

        Your task: 
        1. **Analyze only the workout data for the specific exercise** in the user’s history (if any) in chronological order.
        2. **If there is previous data** for the exercise, do not exceed a 5–10% weight increase from the user’s last working set weight.
        3. **If there is no previous data**, assume a conservative baseline. For a compound lift like deadlift, start with a warm-up set at ~50–60% of an estimated working weight (e.g., 70–80 kg if no other info is available).
        4. **Use a lighter first set** (warm-up) for any big compound lift, especially deadlifts, squats, or bench press.
        5. **User can have wrong setup now** so you need to adjust the weight and reps to the correct ones. (e.g. User can choose wrong weight range for the exercise, sometimes he could start with lower weight in the first set and then increase the weight in the next sets, or focus on the last set. You are expert so you have to decide what is the best option)
        5. **Apply progressive overload**: 
        - Increments must be realistic (max 5–10% higher than the previous session).
        - Respect the user’s training goal (e.g., weight loss → moderate reps, slightly shorter rests).
        - Focus on weight growth in last set
        6. **Output Format** (JSON only):
        json
        ${jsonSchema}
    `;

    const userMessage = `
      Here is the user's workout history for the exercise "${exerciseName}" (ordered by date):
      ${JSON.stringify(previousWorkouts, null, 2)}

      The best number of reps for each set is in range of 5-8 reps per set.

      Your goal is to provide personalized recommendations for the next workout by analyzing:
      - Progress or regression across all past records
      - Comparison of this ${JSON.stringify(
        latestRecord,
        null,
        2
      )} most recent set vs the next set(s) 
    `;

    const response = await openai.chat.completions.create({
      model: "o4-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      response_format: { type: "json_object" },
    });

    const structuredResponse = response.choices[0].message.content;

    let result;
    try {
      result = JSON.parse(structuredResponse);
    } catch (parseError) {
      console.error("Failed to parse JSON from GPT:", parseError);
      return structuredResponse;
    }

    return result;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

const getWeightRecommendation = async (exerciseRecordId: string) => {
  try {
    const data = await getDataForWeightOptimalization(exerciseRecordId);
    const response = await getWeightOptimizationAi(
      data.latestRecord,
      data.previousWorkouts,
      data.exerciseName,
      data.userData
    );

    console.log("AI Decision:", JSON.stringify(response, null, 2));
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error getting weight recommendation:", error);
    throw error;
  }
};

export { getWeightRecommendation };
