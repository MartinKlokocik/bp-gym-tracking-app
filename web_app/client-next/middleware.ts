import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(_req) {
    return NextResponse.next()
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/auth/login', // Path to your custom login page
    },
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow requests to /login and /signup without a token
        const { pathname } = req.nextUrl
        if (
          pathname.startsWith('/auth/login') ||
          pathname.startsWith('/auth/signup')
        ) {
          return true
        }
        // Otherwise, require the user to be authenticated
        return !!token
      },
    },
  }
)

// Specify which routes should be checked by the middleware.
// Here, we protect everything except favicon.ico and public routes
export const config = {
  matcher: ['/((?!favicon.ico|_next/static|_next/image|api/auth).*)'],
}
