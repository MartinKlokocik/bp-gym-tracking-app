import { gql } from "@apollo/client";

// Querries
export const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

export const USER_EXISTS = gql`
  query($username: String!, $email: String!, $password: String!) {
    userExists(username: $username, email: $email, password: $password)
  }
`


// Mutations
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;


// Interfaces
export interface User {
    id: string;
    username: string;
    email: string;
  }
