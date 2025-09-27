"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [statsRes, logsRes] = await Promise.all([
        fetch("/api/admin/stats", { credentials: "include" }),
        fetch("/api/admin/logs?limit=10", { credentials: "include" }),
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
            success: log.success,
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto text-xs md:text-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <Button
          onClick={loadStats}
          disabled={loading}
          variant="outline"
          size="sm"
          className="text-xs px-3 py-2"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="p-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {stats.users}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {stats.orders}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              All time orders
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {formatCurrency(stats.revenue)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Total revenue
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Recent Logins</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {stats.logins}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-4 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm md:text-base font-bold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {stats.recentActivity.length === 0 ? (
            <p className="text-xs text-muted-foreground py-8 text-center">
              No recent activity
            </p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <Badge
                        variant={activity.success ? "default" : "destructive"}
                        className="text-[10px] px-2 py-1 rounded"
                      >
                        {activity.action}
                      </Badge>
                      <span className="text-xs font-medium break-all">
                        {activity.adminEmail}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        on {activity.resource}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {activity.timestamp}
                    </p>
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
