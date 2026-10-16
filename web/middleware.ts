import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;
  const isProtectedRoute = pathname.startsWith('/upload') || pathname.startsWith('/settings');

  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(`${pathname}${search}`);
    const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/upload/:path*', '/settings/:path*'],
};
