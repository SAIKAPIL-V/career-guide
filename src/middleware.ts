
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userLoggedIn = request.cookies.get('userLoggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/dashboard', '/assessment', '/careers', '/find-colleges', '/notifications'];
  const publicOnlyPaths = ['/login', '/signup'];

  // If user is not logged in and trying to access the home page, redirect to login
  if (!userLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is logged in and tries to access login or signup, redirect to dashboard
  if (userLoggedIn && publicOnlyPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not logged in and is trying to access a protected route, redirect to login
  if (!userLoggedIn && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for static files, image optimization, and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
