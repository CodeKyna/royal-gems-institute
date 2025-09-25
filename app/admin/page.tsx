import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminDashboard() {
  // Fetch stats via API route (to be implemented)
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stats`, { cache: 'no-store' });
  // const stats = await res.json();
  const stats = { users: 0, orders: 0, revenue: 0, logins: 0 };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.users}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.orders}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">${stats.revenue}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Logins</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.logins}</div></CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-lg font-medium mb-2">Recent Activity</h2>
        <div className="border rounded-md p-4 text-sm text-muted-foreground">Recent activity log will appear here.</div>
      </div>
    </div>
  );
}
