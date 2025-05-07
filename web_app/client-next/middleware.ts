import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Continue to the page if the path starts with login or signup
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/signup') ||
    pathname.startsWith('/api/auth') ||
    pathname.includes('favicon.ico') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }

  // Check for authentication
  const authHeader = request.headers.get('authorization')
  const cookieHeader = request.headers.get('cookie')

  // If no auth header or cookies, redirect to login
  if (!authHeader && !cookieHeader?.includes('next-auth.session-token')) {
    const url = new URL('/auth/login', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
