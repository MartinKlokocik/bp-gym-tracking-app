import { withAuth } from 'next-auth/middleware'

export default withAuth({
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
})

// Specify which routes should be checked by the middleware.
// Here, we protect everything except favicon.ico
export const config = {
  matcher: ['/((?!favicon.ico).*)'],
}
