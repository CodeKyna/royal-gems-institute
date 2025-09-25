"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type User = { id: string; _id?: string; email: string; firstName: string; lastName: string; role: string; isActive: boolean };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [q, setQ] = useState('');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', role: 'Moderator', password: '' });
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/admin/users?q=${encodeURIComponent(q)}`, { credentials: 'include' });
    const data = await res.json();
    setUsers(data.users || []);
  }
  useEffect(() => { load(); }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Failed'); return; }
    setCreating(false);
    setForm({ email: '', firstName: '', lastName: '', role: 'Moderator', password: '' });
    await load();
  }

  async function toggleActive(u: User) {
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify({ id: (u._id || u.id), isActive: !u.isActive }),
    });
    await load();
  }

  async function changeRole(u: User, role: string) {
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
      credentials: 'include',
      body: JSON.stringify({ id: (u._id || u.id), role }),
    });
    if (res.status === 401) alert('Please re-authenticate for sensitive action.');
    await load();
  }

  async function remove(u: User) {
    const csrf = document.cookie.split('; ').find(r => r.startsWith('csrfToken='))?.split('=')[1] || '';
    const res = await fetch(`/api/admin/users?id=${encodeURIComponent(u._id || u.id)}`, {
      method: 'DELETE', headers: { 'x-csrf-token': csrf }, credentials: 'include'
    });
    if (res.status === 401) alert('Please re-authenticate to delete.');
    await load();
  }

  async function reauth() {
    const password = prompt('Re-enter your password for confirmation');
    if (!password) return;
    const res = await fetch('/api/auth/reauth', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ password })
    });
    if (!res.ok) alert('Re-authentication failed');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => setCreating((s) => !s)}>{creating ? 'Close' : 'New User'}</Button>
          <Button variant="outline" onClick={reauth}>Re-authenticate</Button>
        </div>
      </div>

      {creating && (
        <Card>
          <CardHeader><CardTitle>Create User</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={createUser}>
              <div className="space-y-2 md:col-span-2">
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                  <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Temporary Password</Label>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <p className="text-xs text-muted-foreground">Min 12 chars, upper, lower, number, special.</p>
              </div>
              {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
              <div className="md:col-span-2">
                <Button type="submit">Create</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2">
        <Input placeholder="Search email…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button onClick={load}>Search</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id || u.id} className="border-b">
                    <td className="py-2">{u.email}</td>
                    <td>{u.firstName} {u.lastName}</td>
                    <td>
                      <Select defaultValue={u.role} onValueChange={(v) => changeRole(u, v)}>
                        <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Moderator">Moderator</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td>{u.isActive ? 'Active' : 'Suspended'}</td>
                    <td className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => toggleActive(u)}>{u.isActive ? 'Suspend' : 'Activate'}</Button>
                      <Button size="sm" variant="destructive" onClick={() => remove(u)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
