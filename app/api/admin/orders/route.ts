import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import { authenticate, verifyCSRF, logAction } from '@/lib/security/middleware';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const filter: any = {};
  if (status) filter.status = status;
  const orders = await Order.find(filter).limit(50);
  return NextResponse.json({ orders });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });
  // TODO: Implement order updates, refunds, cancellations with re-auth requirement
  await logAction(user.id, user.email, 'ORDER_UPDATE', 'order', undefined, {}, request, true);
  return NextResponse.json({});
}
