import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gem from '@/lib/models/Gem';
import { authenticate, verifyCSRF, logAction } from '@/lib/security/middleware';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const filter: any = {};
  if (status) filter.approvalStatus = status;
  const gems = await Gem.find(filter).limit(50);
  return NextResponse.json({ gems });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  // TODO: Implement create gem with validation and secure upload handling
  await logAction(user.id, user.email, 'PRODUCT_CREATE', 'gem', undefined, {}, request, true);
  return NextResponse.json({});
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  await logAction(user.id, user.email, 'PRODUCT_UPDATE', 'gem', undefined, {}, request, true);
  return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  await logAction(user.id, user.email, 'PRODUCT_DELETE', 'gem', undefined, {}, request, true);
  return NextResponse.json({});
}
