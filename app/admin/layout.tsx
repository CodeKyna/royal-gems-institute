import Link from 'next/link';
import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Admin</span>
          <Badge variant="secondary">Secure</Badge>
        </div>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link className="hover:underline" href="/admin">Dashboard</Link>
          <Link className="hover:underline" href="/admin/users">Users</Link>
          <Link className="hover:underline" href="/admin/gems">Gems</Link>
          <Link className="hover:underline" href="/admin/orders">Orders</Link>
          <Link className="hover:underline" href="/admin/logs">Logs</Link>
          <Link className="hover:underline" href="/admin/settings">Settings</Link>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        {children}
      </main>
    </div>
  );
}
