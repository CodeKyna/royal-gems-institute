"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type Order = {
  _id: string;
  orderNumber: string;
  userId: { email: string; firstName: string; lastName: string };
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  notes?: string;
  isSuspicious: boolean;
  refundAmount?: number;
  refundReason?: string;
  refundedBy?: { email: string };
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState({ status: 'all', paymentStatus: 'all', suspicious: 'all', q: '' });
  const [updateForm, setUpdateForm] = useState({
    status: '', trackingNumber: '', notes: '', refundAmount: '', refundReason: ''
  });
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status && filter.status !== 'all') params.set('status', filter.status);
    if (filter.paymentStatus && filter.paymentStatus !== 'all') params.set('paymentStatus', filter.paymentStatus);
    if (filter.suspicious && filter.suspicious !== 'all') params.set('suspicious', filter.suspicious === 'true' ? 'true' : '');
    if (filter.q) params.set('q', filter.q);

    const res = await fetch(`/api/admin/orders?${params}`, { credentials: 'include' });
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }

  useEffect(() => { loadOrders(); }, [filter]);

  async function updateOrder() {
    if (!selectedOrder) return;
    setError(null);

    const data = {
      id: selectedOrder._id,
      ...Object.fromEntries(Object.entries(updateForm).filter(([_, v]) => v !== ''))
    };

    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    const res = await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (!res.ok) {
      if (res.status === 401) alert('Please re-authenticate for this action.');
      setError(result.error || 'Failed');
      return;
    }

    setSelectedOrder(null);
    setUpdateForm({ status: '', trackingNumber: '', notes: '', refundAmount: '', refundReason: '' });
    await loadOrders();
  }

  async function markSuspicious(order: Order) {
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify({ id: order._id, markSuspicious: !order.isSuspicious })
    });
    await loadOrders();
  }

  async function reauth() {
    const password = prompt('Re-enter your password for confirmation');
    if (!password) return;
    const res = await fetch('/api/auth/reauth', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ password })
    });
    if (!res.ok) alert('Re-authentication failed');
  }

  const statusColors = {
    Pending: 'yellow', Processing: 'blue', Shipped: 'purple',
    Delivered: 'green', Cancelled: 'red', Refunded: 'red'
  };

  const paymentColors = {
    Pending: 'yellow', Paid: 'green', Failed: 'red', Refunded: 'red'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order Management</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={reauth}>Re-authenticate</Button>
          <Button onClick={loadOrders}>Refresh</Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <Label>Status</Label>
              <Select value={filter.status} onValueChange={(v) => setFilter({...filter, status: v})}>
                <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment</Label>
              <Select value={filter.paymentStatus} onValueChange={(v) => setFilter({...filter, paymentStatus: v})}>
                <SelectTrigger><SelectValue placeholder="All Payments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Suspicious</Label>
              <Select value={filter.suspicious} onValueChange={(v) => setFilter({...filter, suspicious: v})}>
                <SelectTrigger><SelectValue placeholder="All Orders" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="true">Suspicious Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Search</Label>
              <Input placeholder="Order number..." value={filter.q} onChange={(e) => setFilter({...filter, q: e.target.value})} />
            </div>
            <div className="flex items-end">
              <Button onClick={loadOrders}>Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader><CardTitle>Orders ({orders.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className={`border rounded-lg p-4 ${order.isSuspicious ? 'border-red-300 bg-red-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">#{order.orderNumber}</h3>
                        <Badge variant={(statusColors as any)[order.status] || 'secondary'}>{order.status}</Badge>
                        <Badge variant={(paymentColors as any)[order.paymentStatus] || 'secondary'}>{order.paymentStatus}</Badge>
                        {order.isSuspicious && <Badge variant="destructive">Suspicious</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {order.userId.firstName} {order.userId.lastName} • {order.userId.email}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">${order.totalAmount}</span> • {order.paymentMethod}
                        {order.trackingNumber && <span> • Tracking: {order.trackingNumber}</span>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      {order.refundAmount && (
                        <div className="text-sm text-red-600 mt-1">
                          Refunded: ${order.refundAmount} - {order.refundReason}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order #{order.orderNumber}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Items</h4>
                              {order.items.map((item, i) => (
                                <div key={i} className="text-sm">
                                  {item.name} x{item.quantity} - ${item.price * item.quantity}
                                </div>
                              ))}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Shipping Address</h4>
                              <div className="text-sm">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                {order.shippingAddress.country}
                              </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label>Status</Label>
                                <Select value={updateForm.status} onValueChange={(v) => setUpdateForm({...updateForm, status: v})}>
                                  <SelectTrigger><SelectValue placeholder="Update status" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Tracking Number</Label>
                                <Input value={updateForm.trackingNumber} onChange={(e) => setUpdateForm({...updateForm, trackingNumber: e.target.value})} />
                              </div>
                              <div className="md:col-span-2">
                                <Label>Notes</Label>
                                <Textarea value={updateForm.notes} onChange={(e) => setUpdateForm({...updateForm, notes: e.target.value})} />
                              </div>
                              {order.paymentStatus === 'Paid' && (
                                <>
                                  <div>
                                    <Label>Refund Amount</Label>
                                    <Input type="number" step="0.01" value={updateForm.refundAmount} onChange={(e) => setUpdateForm({...updateForm, refundAmount: e.target.value})} />
                                  </div>
                                  <div>
                                    <Label>Refund Reason</Label>
                                    <Input value={updateForm.refundReason} onChange={(e) => setUpdateForm({...updateForm, refundReason: e.target.value})} />
                                  </div>
                                </>
                              )}
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <div className="flex gap-2">
                              <Button onClick={updateOrder}>Update Order</Button>
                              <Button variant="outline" onClick={() => markSuspicious(order)}>
                                {order.isSuspicious ? 'Unmark' : 'Mark'} Suspicious
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
