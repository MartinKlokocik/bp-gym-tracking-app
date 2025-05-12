import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  tags: z.array(z.string().optional()).optional().default([]),
  attachedWorkoutPlan: z.string().optional(),
  userId: z.string().min(1, { message: 'User ID is required' }),
  image: z.string().optional(),
})

export const postCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  attachedWorkoutPlan: z.string().optional(),
  tags: z.array(z.string().optional()).optional().default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  reactions: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      userId: z.string(),
      postId: z.string(),
    })
  ),
  comments: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      userId: z.string(),
      postId: z.string(),
    })
  ),
  user: z.object({
    id: z.string(),
    name: z.string(),
    profilePicture: z.string().optional(),
  }),
  likesCount: z.number(),
  dislikesCount: z.number(),
  commentsCount: z.number(),
})

export type NewPost = z.infer<typeof postSchema>
export type PostCard = z.infer<typeof postCardSchema>
