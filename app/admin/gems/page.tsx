"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

type Gem = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  specifications: {
    carat?: number;
    color?: string;
    clarity?: string;
    cut?: string;
    certification?: string;
  };
  isActive: boolean;
  sellerId?: { email: string; firstName: string; lastName: string };
  approvedBy?: { email: string };
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  stock: number;
  createdAt: string;
};

export default function GemsPage() {
  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Gem | null>(null);
  const [filter, setFilter] = useState({ status: 'all', category: 'all', q: '' });
  const [form, setForm] = useState({
    name: '', description: '', category: 'Diamond', price: '', stock: '1',
    images: [] as string[],
    specifications: { carat: '', color: '', clarity: '', cut: '', certification: '' }
  });
  const [error, setError] = useState<string | null>(null);

  async function loadGems() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status && filter.status !== 'all') params.set('status', filter.status);
    if (filter.category && filter.category !== 'all') params.set('category', filter.category);
    if (filter.q) params.set('q', filter.q);

    const res = await fetch(`/api/admin/gems?${params}`, { credentials: 'include' });
    const data = await res.json();
    setGems(data.gems || []);
    setLoading(false);
  }

  useEffect(() => { loadGems(); }, [filter]);

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'x-csrf-token': csrf },
      credentials: 'include',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.path;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    try {
      const uploads = Array.from(files).map(uploadImage);
      const paths = await Promise.all(uploads);
      setForm(prev => ({ ...prev, images: [...prev.images, ...paths] }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function saveGem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      specifications: Object.fromEntries(
        Object.entries(form.specifications).filter(([_, v]) => v !== '')
      )
    };

    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...data, id: editing._id } : data;

    const res = await fetch('/api/admin/gems', {
      method,
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify(body)
    });

    const result = await res.json();
    if (!res.ok) { setError(result.error || 'Failed'); return; }

    setCreating(false);
    setEditing(null);
    setForm({
      name: '', description: '', category: 'Diamond', price: '', stock: '1',
      images: [],
      specifications: { carat: '', color: '', clarity: '', cut: '', certification: '' }
    });
    await loadGems();
  }

  async function approveGem(gem: Gem, status: 'Approved' | 'Rejected') {
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    await fetch('/api/admin/gems', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify({ id: gem._id, approvalStatus: status })
    });
    await loadGems();
  }

  async function deleteGem(gem: Gem) {
    if (!confirm('Delete this gem?')) return;
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    await fetch(`/api/admin/gems?id=${gem._id}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': csrf },
      credentials: 'include'
    });
    await loadGems();
  }

  function startEdit(gem: Gem) {
    setEditing(gem);
    setForm({
      name: gem.name,
      description: gem.description,
      category: gem.category,
      price: gem.price.toString(),
      stock: gem.stock.toString(),
      images: gem.images,
      specifications: {
        carat: gem.specifications?.carat?.toString() || '',
        color: gem.specifications?.color || '',
        clarity: gem.specifications?.clarity || '',
        cut: gem.specifications?.cut || '',
        certification: gem.specifications?.certification || ''
      }
    });
  }

  const statusColors = { Pending: 'yellow', Approved: 'green', Rejected: 'red' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gem Management</h1>
        <Button onClick={() => setCreating(!creating)}>{creating ? 'Cancel' : 'Add Gem'}</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Status</Label>
              <Select value={filter.status} onValueChange={(v) => setFilter({...filter, status: v})}>
                <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={filter.category} onValueChange={(v) => setFilter({...filter, category: v})}>
                <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                  <SelectItem value="Ruby">Ruby</SelectItem>
                  <SelectItem value="Sapphire">Sapphire</SelectItem>
                  <SelectItem value="Emerald">Emerald</SelectItem>
                  <SelectItem value="Pearl">Pearl</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Search</Label>
              <Input placeholder="Gem name..." value={filter.q} onChange={(e) => setFilter({...filter, q: e.target.value})} />
            </div>
            <div className="flex items-end">
              <Button onClick={loadGems}>Refresh</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {(creating || editing) && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Edit Gem' : 'Create New Gem'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={saveGem}>
              <div className="md:col-span-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({...form, category: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diamond">Diamond</SelectItem>
                    <SelectItem value="Ruby">Ruby</SelectItem>
                    <SelectItem value="Sapphire">Sapphire</SelectItem>
                    <SelectItem value="Emerald">Emerald</SelectItem>
                    <SelectItem value="Pearl">Pearl</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
              </div>
              <div>
                <Label>Stock</Label>
                <Input type="number" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} required />
              </div>
              <div className="md:col-span-2">
                <Label>Images</Label>
                <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                <div className="flex gap-2 mt-2">
                  {form.images.map((img, i) => (
                    <img key={i} src={`/${img}`} alt="" className="w-16 h-16 object-cover rounded" />
                  ))}
                </div>
              </div>
              <div>
                <Label>Carat</Label>
                <Input value={form.specifications.carat} onChange={(e) => setForm({...form, specifications: {...form.specifications, carat: e.target.value}})} />
              </div>
              <div>
                <Label>Color</Label>
                <Input value={form.specifications.color} onChange={(e) => setForm({...form, specifications: {...form.specifications, color: e.target.value}})} />
              </div>
              <div>
                <Label>Clarity</Label>
                <Input value={form.specifications.clarity} onChange={(e) => setForm({...form, specifications: {...form.specifications, clarity: e.target.value}})} />
              </div>
              <div>
                <Label>Cut</Label>
                <Input value={form.specifications.cut} onChange={(e) => setForm({...form, specifications: {...form.specifications, cut: e.target.value}})} />
              </div>
              <div className="md:col-span-2">
                <Label>Certification</Label>
                <Input value={form.specifications.certification} onChange={(e) => setForm({...form, specifications: {...form.specifications, certification: e.target.value}})} />
              </div>
              {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
              <div className="md:col-span-2">
                <Button type="submit">{editing ? 'Update' : 'Create'} Gem</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gems List */}
      <Card>
        <CardHeader><CardTitle>Gems ({gems.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-4">
              {gems.map((gem) => (
                <div key={gem._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{gem.name}</h3>
                        <Badge variant={statusColors[gem.approvalStatus] as any}>{gem.approvalStatus}</Badge>
                        <Badge variant="outline">{gem.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{gem.description}</p>
                      <div className="text-sm">
                        <span className="font-medium">${gem.price}</span> • Stock: {gem.stock}
                        {gem.sellerId && <span> • Seller: {gem.sellerId.firstName} {gem.sellerId.lastName}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(gem)}>Edit</Button>
                      {gem.approvalStatus === 'Pending' && (
                        <>
                          <Button size="sm" variant="default" onClick={() => approveGem(gem, 'Approved')}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => approveGem(gem, 'Rejected')}>Reject</Button>
                        </>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => deleteGem(gem)}>Delete</Button>
                    </div>
                  </div>
                  {gem.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {gem.images.slice(0, 3).map((img, i) => (
                        <img key={i} src={`/${img}`} alt="" className="w-12 h-12 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
