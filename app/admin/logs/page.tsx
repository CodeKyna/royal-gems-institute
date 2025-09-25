"use client";
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type AuditLog = {
  _id: string;
  userId: string;
  email: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details: unknown;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
};

export default function LogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ action: 'all', limit: '50' });

  const loadLogs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.action && filter.action !== 'all') params.set('action', filter.action);
    params.set('limit', filter.limit);

    const res = await fetch(`/api/admin/logs?${params}`, { credentials: 'include' });
    const data = await res.json();
    setLogs(data.logs || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const actionColors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
    LOGIN: 'default',
    LOGOUT: 'secondary',
    USER_CREATE: 'default',
    USER_UPDATE: 'outline',
    USER_DELETE: 'destructive',
    PRODUCT_CREATE: 'default',
    PRODUCT_UPDATE: 'outline',
    PRODUCT_DELETE: 'destructive',
    ORDER_UPDATE: 'outline',
    PASSWORD_RESET: 'outline',
    FAILED_LOGIN: 'destructive',
    SUSPICIOUS_ACTIVITY: 'destructive'
  };

  const formatDetails = (details: unknown): string => {
    if (!details) return '';
    if (typeof details === 'string') return details;
    return JSON.stringify(details, null, 2);
  };

  return (
    <div style={{ transform: 'scale(1.3)', transformOrigin: 'top center' }}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Audit Logs</h1>
        <Button onClick={loadLogs}>Refresh</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Action</Label>
              <Select value={filter.action} onValueChange={(v) => setFilter({...filter, action: v})}>
                <SelectTrigger><SelectValue placeholder="All Actions" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="LOGOUT">Logout</SelectItem>
                  <SelectItem value="USER_CREATE">User Create</SelectItem>
                  <SelectItem value="USER_UPDATE">User Update</SelectItem>
                  <SelectItem value="USER_DELETE">User Delete</SelectItem>
                  <SelectItem value="PRODUCT_CREATE">Product Create</SelectItem>
                  <SelectItem value="PRODUCT_UPDATE">Product Update</SelectItem>
                  <SelectItem value="PRODUCT_DELETE">Product Delete</SelectItem>
                  <SelectItem value="ORDER_UPDATE">Order Update</SelectItem>
                  <SelectItem value="PASSWORD_RESET">Password Reset</SelectItem>
                  <SelectItem value="FAILED_LOGIN">Failed Login</SelectItem>
                  <SelectItem value="SUSPICIOUS_ACTIVITY">Suspicious Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Limit</Label>
              <Select value={filter.limit} onValueChange={(v) => setFilter({...filter, limit: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={loadLogs}>Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader><CardTitle>Recent Activity ({logs.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={actionColors[log.action] || 'secondary'}>{log.action.replace('_', ' ')}</Badge>
                        <span className="text-sm text-muted-foreground">{log.email}</span>
                        {!log.success && <Badge variant="destructive">Failed</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {log.resourceType} {log.resourceId ? `(${log.resourceId.slice(-8)})` : ''}
                      </div>
                      {log.details != null && (
                        <details className="mb-2">
                          <summary className="text-sm cursor-pointer">Details</summary>
                          <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                            {formatDetails(log.details)}
                          </pre>
                        </details>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()} • {log.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {logs.length === 0 && <p className="text-center text-muted-foreground">No logs found</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
