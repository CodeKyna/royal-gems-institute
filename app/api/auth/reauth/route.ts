import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { authenticate } from '@/lib/security/middleware';

export async function POST(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { password } = await request.json();
  if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 });

  const dbUser = await User.findById(user.id).select('+password');
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const ok = await bcrypt.compare(password, dbUser.password);
  if (!ok) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const res = NextResponse.json({ success: true });
  res.cookies.set('reauth', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 5 * 60, // 5 minutes
    path: '/',
  });
  return res;
}
