"use client";

import Link from "next/link";
import { useState } from "react";
import { USER_EXISTS } from "@/graphql/UsersConsts";
import { useLazyQuery } from "@apollo/client";


export default function LoginFormComponent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, setCurrentUser] = useState("");
  const [userExists, setCurrentUserExists] = useState(false);

  const [checkIfUserExists, { loading, error }] = useLazyQuery(USER_EXISTS);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await checkIfUserExists({
      variables: { username, email, password}
    })

    if (data.userExists){
      setCurrentUser( username + " " + email + " " + password);
      setCurrentUserExists( true );
    }
  }

  if (error) return <p>Error loading users: {error.message}</p>;
  if (loading) return <p>Loading users...</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold">Login User</h2>
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
            disabled={loading}
          >
            {loading ? "Logging..." : "Login User"}
          </button>
          {error && (
            <p className="text-red-600">Error logging user: {error}</p>
          )}
        </form>
        <div>
          {userExists
            ? ( <p>Current user: {currentUser}</p> )
            : ( <p>Not logged in.</p> ) 
          }
        </div>
        <div>
            <Link href="/">
                <button>Home</button>
            </Link>
            <Link href="/auth/registration">
                <button>Register</button>
            </Link>
        </div>
      </main>
    </div>
  );
}
