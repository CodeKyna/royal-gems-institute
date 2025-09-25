import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { authenticate, verifyCSRF, logAction } from '@/lib/security/middleware';
import { hashPassword, validatePasswordStrength } from '@/lib/security/auth';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user || user.role !== 'SuperAdmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const admins = await User.find({
    role: { $in: ['Admin', 'Moderator'] }
  }).select('-password -twoFactorSecret -passwordResetToken -passwordResetExpires').sort({ createdAt: -1 });

  return NextResponse.json({ admins });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user || user.role !== 'SuperAdmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!verifyCSRF(request)) {
    return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  }

  const body = await request.json();
  const { email, firstName, lastName, role, password } = body;

  if (!email || !firstName || !lastName || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Only allow Admin and Moderator roles
  if (!['Admin', 'Moderator'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role. Only Admin and Moderator can be created through this interface.' }, { status: 400 });
  }

  const { isValid, errors } = validatePasswordStrength(password);
  if (!isValid) {
    return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
  }

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }

  const hashed = await hashPassword(password);
  const created = await User.create({
    email: email.toLowerCase(),
    firstName,
    lastName,
    role,
    password: hashed,
    isActive: true
  });

  await logAction(user.id, user.email, 'ADMIN_CREATE', 'user', created._id.toString(), {
    target: created.email,
    role: created.role
  }, request, true);

  return NextResponse.json({
    admin: {
      _id: created._id,
      email: created.email,
      firstName,
      lastName,
      role: created.role,
      isActive: created.isActive,
      createdAt: created.createdAt
    }
  });
}