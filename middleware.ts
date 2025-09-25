import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_ROLES = new Set(['SuperAdmin', 'Admin', 'Moderator']);
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

// Paths exempt from admin auth checks
const PUBLIC_ADMIN_PATHS = new Set(['/admin/login']);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow public admin routes (login)
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const csrfHeader = request.headers.get('x-csrf-token');
  const csrfCookie = request.cookies.get('csrfToken')?.value;
  const lastActivity = request.cookies.get('lastActivity')?.value;

  // Session idle timeout (15-30 min) from env, default 30m
  const sessionTimeoutMs = parseInt(process.env.SESSION_TIMEOUT || '1800000');
  if (!lastActivity || Date.now() - Number(lastActivity) > sessionTimeoutMs) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('reason', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }

  // For state-changing requests, enforce CSRF header matches cookie
  const method = request.method.toUpperCase();
  const isMutating = method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
  if (isMutating) {
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      const forbiddenUrl = new URL('/403', request.url);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // Verify access token
  if (!accessToken) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('reason', 'unauthenticated');
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(accessToken, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    const role = String(payload.role || '');
    if (!ADMIN_ROLES.has(role)) {
      const forbiddenUrl = new URL('/403', request.url);
      return NextResponse.redirect(forbiddenUrl);
    }

    // Enforce stricter RBAC for certain paths
    if (pathname.startsWith('/admin/settings') && role !== 'SuperAdmin') {
      const forbiddenUrl = new URL('/403', request.url);
      return NextResponse.redirect(forbiddenUrl);
    }

    // Bump lastActivity to implement idle timeout sliding window
    const res = NextResponse.next();
    res.cookies.set('lastActivity', Date.now().toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/',
    });
    return res;
  } catch (e) {
    // If access token invalid/expired: redirect to login. Client may call refresh.
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('reason', 'token_invalid');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
