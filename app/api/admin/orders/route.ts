import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import { authenticate, verifyCSRF, logAction } from '@/lib/security/middleware';
import { sanitizeInput } from '@/lib/security/auth';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const paymentStatus = url.searchParams.get('paymentStatus');
  const suspicious = url.searchParams.get('suspicious');
  const q = url.searchParams.get('q');

  const filter: any = {};
  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;
  if (suspicious === 'true') filter.isSuspicious = true;
  if (q) filter.orderNumber = { $regex: sanitizeInput(q), $options: 'i' };

  const orders = await Order.find(filter)
    .populate('userId', 'email firstName lastName')
    .populate('refundedBy', 'email')
    .sort({ createdAt: -1 })
    .limit(100);

  return NextResponse.json({ orders });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });

  const body = await request.json();
  const { id, status, trackingNumber, notes, refundAmount, refundReason, markSuspicious } = body;

  const order = await Order.findById(id);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const reauth = request.cookies.get('reauth')?.value === '1';
  const sensitiveActions = ['Cancelled', 'Refunded'].includes(status) || refundAmount || refundReason;

  if (sensitiveActions && !reauth) {
    return NextResponse.json({ error: 'Re-authentication required for sensitive actions' }, { status: 401 });
  }

  if (status) order.status = status;
  if (trackingNumber) order.trackingNumber = sanitizeInput(trackingNumber);
  if (notes) order.notes = sanitizeInput(notes);
  if (markSuspicious !== undefined) order.isSuspicious = markSuspicious;

  if (refundAmount) {
    order.refundAmount = Number(refundAmount);
    order.refundReason = sanitizeInput(refundReason || '');
    order.refundedBy = user.id;
    order.refundedAt = new Date();
    order.status = 'Refunded';
    order.paymentStatus = 'Refunded';
  }

  await order.save();

  const changes = { status, trackingNumber, notes, refundAmount, refundReason, markSuspicious };
  await logAction(user.id, user.email, 'ORDER_UPDATE', 'order', order._id.toString(), { orderNumber: order.orderNumber, changes }, request, true);

  return NextResponse.json({ order });
}
