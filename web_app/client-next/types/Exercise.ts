import { z } from 'zod'

export type Exercise = {
  id: string
  userId: string
  name: string
  description: string
  type: string
  muscleGroup: string
  equipment: string[]
  image?: string
  isPublic: boolean
  isDefault: boolean
}

export const exerciseSchema = z.object({
  userId: z.string().nonempty('User ID is required'),
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  type: z.string().nonempty('Type is required'),
  muscleGroup: z.string().nonempty('Muscle Group is required'),
  equipment: z.union([z.array(z.string()), z.string()]).optional(),
  image: z.string().optional(),
  isPublic: z.boolean(),
  isDefault: z.boolean().optional(),
})

export const exerciseSchemaWithId = exerciseSchema.extend({
  id: z.string(),
})

export type CreateExerciseFormData = z.infer<typeof exerciseSchema>
export type ExerciseWithId = z.infer<typeof exerciseSchemaWithId>