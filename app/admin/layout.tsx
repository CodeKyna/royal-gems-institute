"use client";
import Link from 'next/link';
import { ReactNode, useEffect, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/profile', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
        // If not on login page and not authenticated, redirect to login
        if (pathname !== '/admin/login') {
          router.push('/admin/login?reason=unauthenticated');
        }
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
        <div className="w-full max-w-md" style={{ transform: 'scale(1.3)', transformOrigin: 'center' }}>
          {children}
        </div>
      </div>
    );
  }

  // For authenticated users, show full layout with sidebar
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-lg">Royal Gems Institute - Admin</span>
          {user && (
            <div className="text-sm text-gray-600">
              Welcome, {user.firstName} {user.lastName}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Secure</Badge>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        <aside className="w-64 border-r p-4 space-y-4 bg-white">
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
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
