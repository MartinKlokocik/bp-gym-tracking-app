const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;


export default typeDefs;
