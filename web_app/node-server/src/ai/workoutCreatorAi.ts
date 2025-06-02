import {
  getDataForWorkoutCreator,
  prepareResultForWorkoutCreator,
} from "./getDataForWorkoutCreator";

const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createWorkouts(
  additionalInformations: string,
  exercises: any,
  userData: any,
  useProfileData: boolean
) {
  try {
    const jsonSchema = `
    {
    "name": "string",
    "schema": "string | null",
    "isActive": "boolean",
    "isPublic": "boolean",
    "days": [
        {
        "name": "string",
        "plannedExercises": [
            {
            "exerciseNumber": "number",
            "exerciseId": "string",
            "notes": "string | null",
            "plannedSets": [
                {
                "setNumber": "number",
                "reps": "number",
                "restTime": "number | null"
                }
            ]
            }
        ]
        }
    ]
    }
    `;

    if (!useProfileData) {
      userData = null;
    }

    const systemPrompt = `
        You are an elite strength‐and‐conditioning AI coach.
        Based on the user's profile and additional informations, generate a complete workout plan that:
        • Will have nubmer of days based on the user's data and your best judgement.
        • Uses only the provided exercises (IDs and names below).
        • Respect all user's data as age, height, weight, gender, goals, bmi, experience, injuries, etc.
        Here are user's data:
        ${JSON.stringify(userData, null, 2)}
        • Respects the user's goals: ${userData?.goals}.
        • Includes any extra instructions: ${additionalInformations || "none"}.
        • If user's data is not provided, do not use it in the plan.
        • Choose exercises by the name and muscle group. Choose it wisely to focus on goals.
        Each day must have:
        1. "name": e.g. "Day 1", "Day 2", or something specific for that day, like "Chest & Triceps".  
        2. "plannedExercises": an array of 4–6 exercises per day. For each exercise:
            – "exerciseNumber": its position in the day (1-based).  
            – "exerciseId": one of the IDs below.  
            – "notes": null or a short tip.  
            – "plannedSets": 2-4 sets depending on the exercise and strategy that user wants to follow, or you think is best, each with:
                * setNumber (1,2,3)
                * reps (4–12, depending on goal)
                * restTime in seconds - recommended by you based on the exercise and user's data.
        Do NOT include any extra fields.  Output ONLY valid JSON matching this schema exactly:

        \`\`\`json
        ${jsonSchema}
        \`\`\`
        `;

    const userPrompt = `
        Here is the user record and exercise library:
        
        User:
        ${JSON.stringify(userData, null, 2)}
        
        Exercises:
        ${JSON.stringify(
          exercises.map((e: any) => ({
            id: e.id,
            name: e.name,
            muscleGroup: e.muscleGroup,
            equipment: e.equipment,
          })),
          null,
          2
        )}
    `;

    const response = await openai.chat.completions.create({
      model: "o4-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
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

const generateWorkouts = async (
  additionalInformations: string,
  userId: string,
  useProfileData: boolean
) => {
  try {
    const data = await getDataForWorkoutCreator(userId);
    const response = await createWorkouts(
      additionalInformations,
      data.exercises,
      data.userData,
      useProfileData
    );

    console.log("AI Decision:", JSON.stringify(response, null, 2));

    const preparedResponse = prepareResultForWorkoutCreator(
      response,
      userId,
      data.exercises
    );

    return JSON.stringify(preparedResponse);
  } catch (error) {
    console.error("Error getting weight recommendation:", error);
    throw error;
  }
};

export { generateWorkouts };
