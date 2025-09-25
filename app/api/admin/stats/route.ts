import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';
import AuditLog from '@/lib/models/AuditLog';
import { authenticate } from '@/lib/security/middleware';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [users, orders, revenueAgg, logins] = await Promise.all([
    User.countDocuments({}),
    Order.countDocuments({}),
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
    AuditLog.countDocuments({ action: 'LOGIN', success: true, timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
  ]);

  const revenue = revenueAgg[0]?.total || 0;
  return NextResponse.json({ users, orders, revenue, logins });
}
