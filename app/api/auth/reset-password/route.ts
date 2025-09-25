import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { hashPassword, validatePasswordStrength } from '@/lib/security/auth';
import { logAction } from '@/lib/security/middleware';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { isValid, errors } = validatePasswordStrength(password);
    if (!isValid) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }

    const user = await User.findOne({ passwordResetToken: token }).select('+passwordResetExpires');
    if (!user || !user.passwordResetExpires || user.passwordResetExpires.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.password = await hashPassword(password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    await logAction(
      user._id.toString(),
      user.email,
      'PASSWORD_RESET',
      'auth',
      user._id.toString(),
      { resetCompleted: true },
      request,
      true
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
