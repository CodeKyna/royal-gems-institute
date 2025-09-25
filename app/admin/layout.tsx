"use client";
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/profile', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // If not on login page and not authenticated, redirect to login
        if (pathname !== '/admin/login') {
          router.push('/admin/login?reason=unauthenticated');
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrfToken='))?.split('=')[1];

      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken || '',
        },
        credentials: 'include',
      });
      setIsAuthenticated(false);
      setUser(null);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // For login page, don't show sidebar
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }

  // For authenticated users, show full layout with sidebar
  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r p-4 space-y-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold">Admin</span>
            {user && (
              <div className="text-xs text-gray-600 mt-1">
                {user.firstName} {user.lastName}
              </div>
            )}
          </div>
          <Badge variant="secondary">Secure</Badge>
        </div>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link className="hover:underline" href="/admin">Dashboard</Link>
          <Link className="hover:underline" href="/admin/users">Users</Link>
          {user?.role === 'SuperAdmin' && (
            <Link className="hover:underline" href="/admin/admins">Admins</Link>
          )}
          <Link className="hover:underline" href="/admin/gems">Gems</Link>
          <Link className="hover:underline" href="/admin/orders">Orders</Link>
          <Link className="hover:underline" href="/admin/logs">Logs</Link>
          {user?.role === 'SuperAdmin' && (
            <Link className="hover:underline" href="/admin/settings">Settings</Link>
          )}
        </nav>
        <div className="pt-4 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        {children}
      </main>
    </div>
  );
}
