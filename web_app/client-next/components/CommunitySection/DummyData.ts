export type Post = {
  id: string
  title: string
  content: string
  image?: string
  tags: string[]
  attachedWorkoutPLan?: string | null
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  userId: string
  comments: PostComment[]
  reactions: Reaction[]

  // Included fields
  user: {
    id: string
    name: string
    image?: string
  }
}

export type PostComment = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  postId: string
  userId: string
  reactions: Reaction[]
}

export enum ReactionType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

export enum ReactionTarget {
  POST = 'POST',
  COMMENT = 'COMMENT',
}

export type Reaction = {
  id: string
  type: ReactionType
  target: ReactionTarget
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  postId: string
  userId: string
  postCommentId: string
}

export const dummyPosts: Post[] = [
  {
    id: 'post1',
    title: 'Morning Workout Routine',
    content:
      'Start your day with a quick 20-minute workout. Here is a simple plan.',
    image:
      'https://lbxmtenbmntnpvhgoayu.supabase.co/storage/v1/object/public/gym-tracking-app/avatar/5c539c52-f21a-44c3-81b8-52c41fcd5d72.png',
    tags: ['fitness', 'morning', 'routine'],
    attachedWorkoutPLan: 'https://example.com/plan1.pdf',
    createdAt: new Date('2025-05-01T08:00:00Z'),
    updatedAt: new Date('2025-05-02T08:00:00Z'),
    isDeleted: false,
    userId: 'user1',
    user: {
      id: 'user1',
      name: 'John Doe',
      image:
        'https://lbxmtenbmntnpvhgoayu.supabase.co/storage/v1/object/public/gym-tracking-app/avatar/5c539c52-f21a-44c3-81b8-52c41fcd5d72.png',
    },
    comments: [
      {
        id: 'comment1',
        content: 'Great routine! I tried it today.',
        createdAt: new Date('2025-05-01T09:00:00Z'),
        updatedAt: new Date('2025-05-01T09:30:00Z'),
        isDeleted: false,
        postId: 'post1',
        userId: 'user2',
        reactions: [
          {
            id: 'reaction1',
            type: ReactionType.LIKE,
            target: ReactionTarget.COMMENT,
            createdAt: new Date('2025-05-01T09:45:00Z'),
            updatedAt: new Date('2025-05-01T09:45:00Z'),
            isDeleted: false,
            postId: 'post1',
            userId: 'user3',
            postCommentId: 'comment1',
          },
        ],
      },
      {
        id: 'comment2',
        content: 'Can you share more tips?',
        createdAt: new Date('2025-05-01T10:00:00Z'),
        updatedAt: new Date('2025-05-01T10:05:00Z'),
        isDeleted: false,
        postId: 'post1',
        userId: 'user4',
        reactions: [
          {
            id: 'reaction2',
            type: ReactionType.DISLIKE,
            target: ReactionTarget.COMMENT,
            createdAt: new Date('2025-05-01T10:10:00Z'),
            updatedAt: new Date('2025-05-01T10:10:00Z'),
            isDeleted: false,
            postId: 'post1',
            userId: 'user5',
            postCommentId: 'comment2',
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'reaction3',
        type: ReactionType.LIKE,
        target: ReactionTarget.POST,
        createdAt: new Date('2025-05-01T08:30:00Z'),
        updatedAt: new Date('2025-05-01T08:30:00Z'),
        isDeleted: false,
        postId: 'post1',
        userId: 'user2',
        postCommentId: '',
      },
      {
        id: 'reaction4',
        type: ReactionType.DISLIKE,
        target: ReactionTarget.POST,
        createdAt: new Date('2025-05-01T08:45:00Z'),
        updatedAt: new Date('2025-05-01T08:45:00Z'),
        isDeleted: false,
        postId: 'post1',
        userId: 'user6',
        postCommentId: '',
      },
    ],
  },
  {
    id: 'post2',
    title: 'Healthy Meal Prep',
    content: 'Plan your meals for the week with these easy recipes.',
    image: undefined,
    tags: ['nutrition', 'meal prep', 'health'],
    attachedWorkoutPLan: null,
    createdAt: new Date('2025-05-03T12:00:00Z'),
    updatedAt: new Date('2025-05-04T15:00:00Z'),
    isDeleted: false,
    userId: 'user3',
    user: {
      id: 'user3',
      name: 'Jane Smith',
      image:
        'https://lbxmtenbmntnpvhgoayu.supabase.co/storage/v1/object/public/gym-tracking-app/avatar/5c539c52-f21a-44c3-81b8-52c41fcd5d72.png',
    },
    comments: [
      {
        id: 'comment3',
        content: 'Looks delicious! Will try this.',
        createdAt: new Date('2025-05-03T13:00:00Z'),
        updatedAt: new Date('2025-05-03T13:10:00Z'),
        isDeleted: false,
        postId: 'post2',
        userId: 'user5',
        reactions: [],
      },
    ],
    reactions: [
      {
        id: 'reaction5',
        type: ReactionType.LIKE,
        target: ReactionTarget.POST,
        createdAt: new Date('2025-05-03T12:30:00Z'),
        updatedAt: new Date('2025-05-03T12:30:00Z'),
        isDeleted: false,
        postId: 'post2',
        userId: 'user4',
        postCommentId: '',
      },
    ],
  },
]
