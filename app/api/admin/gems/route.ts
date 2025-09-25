import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gem from '@/lib/models/Gem';
import { authenticate, verifyCSRF, logAction } from '@/lib/security/middleware';
import { sanitizeInput } from '@/lib/security/auth';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const category = url.searchParams.get('category');
  const q = url.searchParams.get('q');

  const filter: any = {};
  if (status) filter.approvalStatus = status;
  if (category) filter.category = category;
  if (q) filter.name = { $regex: sanitizeInput(q), $options: 'i' };

  const gems = await Gem.find(filter).populate('sellerId', 'email firstName lastName').populate('approvedBy', 'email').sort({ createdAt: -1 }).limit(100);
  return NextResponse.json({ gems });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });

  const body = await request.json();
  const { name, description, category, price, images, specifications, stock } = body;

  if (!name || !description || !category || !price || !images || images.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const gem = await Gem.create({
    name: sanitizeInput(name),
    description: sanitizeInput(description),
    category,
    price: Number(price),
    images,
    specifications: specifications || {},
    stock: Number(stock) || 1,
    sellerId: user.id,
    approvalStatus: user.role === 'SuperAdmin' ? 'Approved' : 'Pending'
  });

  await logAction(user.id, user.email, 'PRODUCT_CREATE', 'gem', gem._id.toString(), { name, category }, request, true);
  return NextResponse.json({ gem });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });

  const body = await request.json();
  const { id, name, description, category, price, images, specifications, stock, approvalStatus } = body;

  const gem = await Gem.findById(id);
  if (!gem) return NextResponse.json({ error: 'Gem not found' }, { status: 404 });

  // Only SuperAdmin can approve/reject
  if (approvalStatus && user.role !== 'SuperAdmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (name) gem.name = sanitizeInput(name);
  if (description) gem.description = sanitizeInput(description);
  if (category) gem.category = category;
  if (price !== undefined) gem.price = Number(price);
  if (images) gem.images = images;
  if (specifications) gem.specifications = specifications;
  if (stock !== undefined) gem.stock = Number(stock);
  if (approvalStatus) {
    gem.approvalStatus = approvalStatus;
    if (approvalStatus === 'Approved') gem.approvedBy = user.id;
  }

  await gem.save();
  await logAction(user.id, user.email, 'PRODUCT_UPDATE', 'gem', gem._id.toString(), { changes: { name, category, approvalStatus } }, request, true);
  return NextResponse.json({ gem });
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { user } = await authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!verifyCSRF(request)) return NextResponse.json({ error: 'CSRF' }, { status: 403 });

  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const gem = await Gem.findById(id);
  if (!gem) return NextResponse.json({ error: 'Gem not found' }, { status: 404 });

  // Only SuperAdmin can delete approved gems
  if (gem.approvalStatus === 'Approved' && user.role !== 'SuperAdmin') {
    return NextResponse.json({ error: 'Cannot delete approved gem' }, { status: 403 });
  }

  await Gem.findByIdAndDelete(id);
  await logAction(user.id, user.email, 'PRODUCT_DELETE', 'gem', id, { name: gem.name }, request, true);
  return NextResponse.json({ success: true });
}
