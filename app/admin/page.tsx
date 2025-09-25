"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ApiAuditLog {
  _id: string;
  action: string;
  adminEmail: string;
  resource: string;
  timestamp: string;
  success: boolean;
}

interface ActivityItem {
  id: string;
  action: string;
  adminEmail: string;
  resource: string;
  timestamp: string;
  success: boolean;
}

interface DashboardStats {
  users: number;
  orders: number;
  revenue: number;
  logins: number;
  recentActivity: ActivityItem[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    orders: 0,
    revenue: 0,
    logins: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [statsRes, logsRes] = await Promise.all([
        fetch('/api/admin/stats', { credentials: 'include' }),
        fetch('/api/admin/logs?limit=10', { credentials: 'include' })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats((prev: DashboardStats) => ({ ...prev, ...statsData }));
      }

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setStats((prev: DashboardStats) => ({
          ...prev,
          recentActivity: logsData.logs.map((log: ApiAuditLog) => ({
            id: log._id,
            action: log.action,
            adminEmail: log.adminEmail,
            resource: log.resource,
            timestamp: new Date(log.timestamp).toLocaleString(),
            success: log.success
          }))
        }));
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-8 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={loadStats} disabled={loading} variant="outline" size="lg">
          <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold text-primary">{stats.users}</div>
            <p className="text-sm text-muted-foreground mt-2">Registered users</p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold text-primary">{stats.orders}</div>
            <p className="text-sm text-muted-foreground mt-2">All time orders</p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold text-primary">{formatCurrency(stats.revenue)}</div>
            <p className="text-sm text-muted-foreground mt-2">Total revenue</p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Recent Logins</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold text-primary">{stats.logins}</div>
            <p className="text-sm text-muted-foreground mt-2">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {stats.recentActivity.length === 0 ? (
            <p className="text-lg text-muted-foreground py-8 text-center">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={activity.success ? "default" : "destructive"} className="text-sm px-3 py-1">
                        {activity.action}
                      </Badge>
                      <span className="text-base font-medium">{activity.adminEmail}</span>
                      <span className="text-base text-muted-foreground">on {activity.resource}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
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
