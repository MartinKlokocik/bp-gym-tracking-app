const CommunitySectionTypeDefs = `
  type PostComment {
    id: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    isDeleted: Boolean!
    user: PostUser!
    likesCount: Int!
    dislikesCount: Int!
    isLiked: Boolean!
    isDisliked: Boolean!
    isUserCreator: Boolean!
  }

  type Reaction {
    id: String!
    type: String!
    createdAt: String!
    updatedAt: String!
    isDeleted: Boolean!
  }

  type PostUser {
    id: String!
    name: String!
    profilePicture: String
  }

  type Post {
    id: String!
    title: String!
    content: String!
    image: String
    tags: [String]!
    attachedWorkoutPlan: String
    createdAt: String!
    updatedAt: String!
    isDeleted: Boolean!
    user: PostUser!
    comments: [PostComment!]!
    reactions: [Reaction!]!
    likesCount: Int!
    dislikesCount: Int!
    commentsCount: Int!
    isLiked: Boolean!
    isDisliked: Boolean!
    isUserCreator: Boolean!
  }

  input PostInput {
    title: String!
    content: String!
    image: String
    tags: [String]!
    attachedWorkoutPlan: String
    userId: String!
  }

  type CreatePostResponse {
    id: String!
    title: String!
    content: String!
    image: String
    tags: [String]!
    attachedWorkoutPlan: String
    userId: String!
    createdAt: String!
    updatedAt: String!
    isDeleted: Boolean!
  }

  input CommentInput {
    postId: String!
    userId: String!
    content: String!
  }

  type CreateCommentResponse {
    id: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    isDeleted: Boolean!
    postId: String!
    userId: String!
  }

  type Query {
    getTrendingPosts(userId: String!, searchTerm: String): [Post!]!
    getRecentPosts(userId: String!, searchTerm: String): [Post!]!
    getMyPosts(userId: String!, searchTerm: String): [Post!]!
  }

  type Mutation {
    createPost(input: PostInput!): CreatePostResponse!
    hitLikePost(postId: String!, userId: String!): Boolean!
    hitDislikePost(postId: String!, userId: String!): Boolean!
    createComment(input: CommentInput!): CreateCommentResponse!
    hitLikeComment(commentId: String!, userId: String!): Boolean!
    hitDislikeComment(commentId: String!, userId: String!): Boolean!
    saveWorkoutToMyPlans(userId: String!, workoutPlanId: String!): Boolean!
    deletePost(postId: String!): Boolean!
  }
`;

export default CommunitySectionTypeDefs;
