import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AuditLog from '@/lib/models/AuditLog';
import { authenticate } from '@/lib/security/middleware';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const limit = parseInt(url.searchParams.get('limit') || '100');

  const filter: any = {};
  if (action) filter.action = action;

  const logs = await AuditLog.find(filter)
    .sort({ timestamp: -1 })
    .limit(Math.min(limit, 1000)); // Cap at 1000 for performance

  return NextResponse.json({ logs });
}
