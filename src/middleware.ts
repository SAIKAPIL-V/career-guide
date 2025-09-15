
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userLoggedIn = request.cookies.get('userLoggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  // If user is not logged in and is trying to access a protected route, redirect to login
  if (!userLoggedIn && pathname !== '/login' && pathname !== '/signup') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login or signup, redirect to home
  if (userLoggedIn && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for static files, image optimization, and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
