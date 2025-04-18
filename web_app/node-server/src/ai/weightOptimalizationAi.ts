const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const {
  previousWorkouts,
  exerciseType,
  userData,
  getJsonForPrompt,
  numberOfSets,
} = require("./exampleData");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getWeightOptimizationAi(
  previousWorkouts: any[],
  exerciseType: string,
  userData: any
) {
  try {
    previousWorkouts.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const jsonSchema = getJsonForPrompt(numberOfSets);

    const systemPrompt = `
        You are an elite strength coach with deep expertise in:
        - Progressive overload
        - Fatigue management
        - Exercise-specific strategies
        - Body composition goals (weight loss, muscle gain, etc.)

        You have a user with these stats:
        - Age: ${userData.age} years
        - Weight: ${userData.weight} kg
        - Height: ${userData.height} cm
        - Training experience: ${userData.experienceLevel}
        - Main goal: ${userData.preference}

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
      Here is the user's workout history for the exercise "${exerciseType}" (ordered by date):
      ${JSON.stringify(previousWorkouts, null, 2)}

      The best number of reps for each set is:
      - Set 1: 8 reps
      - Set 2: 6 reps
      - Set 3: 5 reps

      What is the best next strategy?
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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
      temperature: 0.4,
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

// getWeightOptimizationAi(previousWorkouts, exerciseType, userData).then(
//   (response) => {
//     console.log("AI:", response);
//   }
// );

const getWeightRecommendation = async (exerciseRecordId: string) => {
  try {
    const response = await getWeightOptimizationAi(
      previousWorkouts,
      exerciseType,
      userData
    );
    console.log("AI Decision:", response);
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error getting weight recommendation:", error);
    throw error;
  }
};

export { getWeightRecommendation };
