import { NextRequest, NextResponse } from 'next/server';
import { authenticate, logAction } from '@/lib/security/middleware';

export async function POST(request: NextRequest) {
  try {
    const { user, error } = await authenticate(request);
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Log logout action
    await logAction(
      user.id,
      user.email,
      'LOGOUT',
      'auth',
      undefined,
      {},
      request,
      true
    );

    // Clear all authentication cookies
    const response = NextResponse.json({ success: true });
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 0 // Expire immediately
    };

    response.cookies.set('accessToken', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('sessionId', '', cookieOptions);
    response.cookies.set('lastActivity', '', cookieOptions);
    
    // Clear CSRF token (not httpOnly)
    response.cookies.set('csrfToken', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}