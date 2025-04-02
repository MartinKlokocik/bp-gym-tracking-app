import { z } from 'zod'

export const userProfileSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  profilePicture: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  fitnessLevel: z.string().optional(),
  yearsOfExperience: z.number().optional(),
  primaryGoal: z.string().optional(),
  secondaryGoals: z.array(z.string()).optional(),
  preferredWorkoutDays: z.number().optional(),
  workoutDuration: z.number().optional(),
  availableEquipment: z.array(z.string()).optional(),
  healthIssues: z.string().optional(),
  injuries: z.string().optional(),
})

export type UserProfileType = z.infer<typeof userProfileSchema>
