import NextAuth from 'next-auth'

// Extend the built-in User object
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      token: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    token: string
  }
}
