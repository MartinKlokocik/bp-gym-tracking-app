const userProfileTypeDefs = `
  type Mutation {
    updateUserProfile(userId: String!, data: UserProfileUpdateInput!): UserProfile!
  }

  type Query {
    getUserProfile(userId: String!): UserProfile!
  }
`;

export default userProfileTypeDefs;
