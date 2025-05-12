const CommunitySectionTypeDefs = `
  type PostComment {
    id: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    isDeleted: Boolean!
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

  type Query {
    getTrendingPosts: [Post!]!
    getRecentPosts: [Post!]!
    getMyPosts(userId: String!): [Post!]!
  }

  type Mutation {
    createPost(input: PostInput!): CreatePostResponse!
  }
`;

export default CommunitySectionTypeDefs;
