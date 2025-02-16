const usersTypeDefs = `
  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): LoginResponse!
  }
`;

export default usersTypeDefs;
