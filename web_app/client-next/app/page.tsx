"use client";


import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch Users
  const { loading: usersLoading, error: usersError, data: usersData, refetch } =
  useQuery<{ users: User[] }>(GET_USERS);

  // Create User Mutation
  const [createUser, { loading: creatingUser, error: createError }] = useMutation<{
    createUser: User;
  }>(CREATE_USER, {
    onCompleted: () => {
      // Refetch users after creating a user
      refetch();
      setUsername("");
      setEmail("");
      setPassword("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          username,
          email,
          password,
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* User Creation Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold">Create New User</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full text-black"
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full text-black"
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full text-black"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={creatingUser}
          >
            {creatingUser ? "Creating..." : "Create User"}
          </button>
          {createError && (
            <p className="text-red-600">Error creating user: {createError.message}</p>
          )}
        </form>

        {/* User List */}
        <h1 className="text-2xl font-bold">Users List</h1>
        <ul>
          {usersData?.users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
