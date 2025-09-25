import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { authenticate, verifyCSRF, logAction } from '@/lib/security/middleware';
import { hashPassword, validatePasswordStrength } from '@/lib/security/auth';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const users = await User.find({ email: { $regex: q, $options: 'i' } }).limit(50).select('-password -twoFactorSecret -passwordResetToken -passwordResetExpires');
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!['SuperAdmin', 'Admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  const body = await request.json();
  const { email, firstName, lastName, role, password } = body || {};
  if (!email || !firstName || !lastName || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Prevent creating SuperAdmin accounts through this interface
  if (role === 'SuperAdmin') {
    return NextResponse.json({ error: 'SuperAdmin accounts can only be created through authorized scripts' }, { status: 403 });
  }

  // Validate role
  if (role && !['Admin', 'Moderator'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const { isValid, errors } = validatePasswordStrength(password);
  if (!isValid) return NextResponse.json({ error: errors.join(', ') }, { status: 400 });

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

  const hashed = await hashPassword(password);
  const created = await User.create({ email: email.toLowerCase(), firstName, lastName, role: role || 'Moderator', password: hashed, isActive: true });
  await logAction(user.id, user.email, 'USER_CREATE', 'user', created._id.toString(), { target: created.email }, request, true);
  return NextResponse.json({ user: { id: created._id, email: created.email, firstName, lastName, role: created.role } });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!['SuperAdmin', 'Admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  const { id, role, isActive, resetPassword } = await request.json();
  const target = await User.findById(id);
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const reauth = request.cookies.get('reauth')?.value === '1';
  if ((role || resetPassword) && !reauth) {
    return NextResponse.json({ error: 'Re-authentication required' }, { status: 401 });
  }

  if (typeof isActive === 'boolean') target.isActive = isActive;
  if (role) target.role = role;
  if (resetPassword) {
    const { isValid, errors } = validatePasswordStrength(resetPassword);
    if (!isValid) return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    target.password = await hashPassword(resetPassword);
  }
  await target.save();
  await logAction(user.id, user.email, 'USER_UPDATE', 'user', target._id.toString(), { changes: { role, isActive, resetPassword: !!resetPassword } }, request, true);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!['SuperAdmin', 'Admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const reauth = request.cookies.get('reauth')?.value === '1';
  if (!reauth) return NextResponse.json({ error: 'Re-authentication required' }, { status: 401 });
  await User.findByIdAndDelete(id);
  await logAction(user.id, user.email, 'USER_DELETE', 'user', id, {}, request, true);
  return NextResponse.json({ success: true });
}
