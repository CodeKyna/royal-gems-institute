"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reason = params.get('reason');
    if (reason === 'session_expired') setError('Your session expired. Please log in again.');
    if (reason === 'unauthenticated') setError('Please log in to continue.');
    if (reason === 'token_invalid') setError('Your session is invalid. Please log in.');
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrfToken='))?.split('=')[1];

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken || '',
        },
        body: JSON.stringify({ email, password, twoFactorToken: requires2FA ? twoFactorToken : undefined }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        return;
      }
      if (data.requires2FA) {
        setRequires2FA(true);
        setError('Enter your 2FA code to continue.');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {requires2FA && (
              <div className="space-y-2">
                <Label htmlFor="twofactor">2FA Code</Label>
                <Input id="twofactor" inputMode="numeric" pattern="\\d{6}" maxLength={6} value={twoFactorToken} onChange={(e) => setTwoFactorToken(e.target.value)} />
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-between">
              <Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Button>
              <a href="/admin/forgot-password" className="text-sm hover:underline">Forgot password?</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
