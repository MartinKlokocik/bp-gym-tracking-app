const usersTypeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Query {
    userExists(username: String!, email: String!, password: String!): Boolean!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;


export default usersTypeDefs;
