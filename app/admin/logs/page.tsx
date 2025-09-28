// "use client";
// import { useEffect, useState, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';

// type AuditLog = {
//   _id: string;
//   userId: string;
//   email: string;
//   action: string;
//   resourceType: string;
//   resourceId?: string;
//   details: unknown;
//   ipAddress: string;
//   userAgent: string;
//   timestamp: string;
//   success: boolean;
// };

// export default function LogsPage() {
//   const [logs, setLogs] = useState<AuditLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState({ action: 'all', limit: '50' });

//   const loadLogs = useCallback(async () => {
//     setLoading(true);
//     const params = new URLSearchParams();
//     if (filter.action && filter.action !== 'all') params.set('action', filter.action);
//     params.set('limit', filter.limit);

//     const res = await fetch(`/api/admin/logs?${params}`, { credentials: 'include' });
//     const data = await res.json();
//     setLogs(data.logs || []);
//     setLoading(false);
//   }, [filter]);

//   useEffect(() => { loadLogs(); }, [loadLogs]);

//   const actionColors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
//     LOGIN: 'default',
//     LOGOUT: 'secondary',
//     USER_CREATE: 'default',
//     USER_UPDATE: 'outline',
//     USER_DELETE: 'destructive',
//     PRODUCT_CREATE: 'default',
//     PRODUCT_UPDATE: 'outline',
//     PRODUCT_DELETE: 'destructive',
//     ORDER_UPDATE: 'outline',
//     PASSWORD_RESET: 'outline',
//     FAILED_LOGIN: 'destructive',
//     SUSPICIOUS_ACTIVITY: 'destructive'
//   };

//   const formatDetails = (details: unknown): string => {
//     if (!details) return '';
//     if (typeof details === 'string') return details;
//     return JSON.stringify(details, null, 2);
//   };

//   return (
//     <div style={{ transform: 'scale(1.3)', transformOrigin: 'top center' }}>
//       <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Audit Logs</h1>
//         <Button onClick={loadLogs}>Refresh</Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="grid gap-4 md:grid-cols-3">
//             <div>
//               <Label>Action</Label>
//               <Select value={filter.action} onValueChange={(v) => setFilter({...filter, action: v})}>
//                 <SelectTrigger><SelectValue placeholder="All Actions" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Actions</SelectItem>
//                   <SelectItem value="LOGIN">Login</SelectItem>
//                   <SelectItem value="LOGOUT">Logout</SelectItem>
//                   <SelectItem value="USER_CREATE">User Create</SelectItem>
//                   <SelectItem value="USER_UPDATE">User Update</SelectItem>
//                   <SelectItem value="USER_DELETE">User Delete</SelectItem>
//                   <SelectItem value="PRODUCT_CREATE">Product Create</SelectItem>
//                   <SelectItem value="PRODUCT_UPDATE">Product Update</SelectItem>
//                   <SelectItem value="PRODUCT_DELETE">Product Delete</SelectItem>
//                   <SelectItem value="ORDER_UPDATE">Order Update</SelectItem>
//                   <SelectItem value="PASSWORD_RESET">Password Reset</SelectItem>
//                   <SelectItem value="FAILED_LOGIN">Failed Login</SelectItem>
//                   <SelectItem value="SUSPICIOUS_ACTIVITY">Suspicious Activity</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Limit</Label>
//               <Select value={filter.limit} onValueChange={(v) => setFilter({...filter, limit: v})}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="50">50</SelectItem>
//                   <SelectItem value="100">100</SelectItem>
//                   <SelectItem value="500">500</SelectItem>
//                   <SelectItem value="1000">1000</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex items-end">
//               <Button onClick={loadLogs}>Apply Filters</Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Logs List */}
//       <Card>
//         <CardHeader><CardTitle>Recent Activity ({logs.length})</CardTitle></CardHeader>
//         <CardContent>
//           {loading ? <p>Loading...</p> : (
//             <div className="space-y-4">
//               {logs.map((log) => (
//                 <div key={log._id} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Badge variant={actionColors[log.action] || 'secondary'}>{log.action.replace('_', ' ')}</Badge>
//                         <span className="text-sm text-muted-foreground">{log.email}</span>
//                         {!log.success && <Badge variant="destructive">Failed</Badge>}
//                       </div>
//                       <div className="text-sm text-muted-foreground mb-2">
//                         {log.resourceType} {log.resourceId ? `(${log.resourceId.slice(-8)})` : ''}
//                       </div>
//                       {log.details != null && (
//                         <details className="mb-2">
//                           <summary className="text-sm cursor-pointer">Details</summary>
//                           <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
//                             {formatDetails(log.details)}
//                           </pre>
//                         </details>
//                       )}
//                       <div className="text-xs text-muted-foreground">
//                         {new Date(log.timestamp).toLocaleString()} • {log.ipAddress}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {logs.length === 0 && <p className="text-center text-muted-foreground">No logs found</p>}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   </div>
//   );
// }

"use client";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Monitor,
  Activity,
  Eye,
  Database,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  Edit3,
  Trash2,
  ShoppingCart,
  Package,
  CreditCard,
  LogIn,
  LogOut,
  KeyRound,
  AlertCircle,
  TrendingUp,
  Download,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

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
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      _id: "1",
      userId: "user-123",
      email: "admin@royalgems.com",
      action: "LOGIN",
      resourceType: "AUTH",
      details: { method: "2FA", location: "New York, NY" },
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      timestamp: "2024-09-27T10:30:00Z",
      success: true,
    },
    {
      _id: "2",
      userId: "user-456",
      email: "sarah.admin@royalgems.com",
      action: "USER_CREATE",
      resourceType: "USER",
      resourceId: "user-789",
      details: { role: "Moderator", firstName: "John", lastName: "Doe" },
      ipAddress: "10.0.0.1",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      timestamp: "2024-09-27T09:45:00Z",
      success: true,
    },
    {
      _id: "3",
      userId: "user-321",
      email: "malicious@example.com",
      action: "FAILED_LOGIN",
      resourceType: "AUTH",
      details: { attempts: 5, reason: "Invalid password" },
      ipAddress: "203.0.113.1",
      userAgent: "curl/7.68.0",
      timestamp: "2024-09-27T08:15:00Z",
      success: false,
    },
    {
      _id: "4",
      userId: "user-123",
      email: "admin@royalgems.com",
      action: "PRODUCT_UPDATE",
      resourceType: "PRODUCT",
      resourceId: "prod-456",
      details: {
        changes: { price: { from: 2500, to: 2400 }, stock: { from: 5, to: 3 } },
      },
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      timestamp: "2024-09-27T07:30:00Z",
      success: true,
    },
    {
      _id: "5",
      userId: "user-789",
      email: "suspicious@test.com",
      action: "SUSPICIOUS_ACTIVITY",
      resourceType: "SECURITY",
      details: {
        anomaly: "Multiple failed login attempts from different IPs",
        risk: "HIGH",
      },
      ipAddress: "198.51.100.1",
      userAgent: "Python/3.9 requests/2.28.1",
      timestamp: "2024-09-27T06:00:00Z",
      success: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    action: "all",
    limit: "50",
    user: "",
    success: "all",
    timeRange: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const params = new URLSearchParams();
      // In real implementation, apply filters here
      let filteredLogs = [...logs];

      if (filter.action !== "all") {
        filteredLogs = filteredLogs.filter(
          (log) => log.action === filter.action
        );
      }

      if (filter.success !== "all") {
        filteredLogs = filteredLogs.filter((log) =>
          filter.success === "success" ? log.success : !log.success
        );
      }

      if (searchQuery) {
        filteredLogs = filteredLogs.filter(
          (log) =>
            log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.ipAddress.includes(searchQuery) ||
            log.resourceType.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply limit
      filteredLogs = filteredLogs.slice(0, parseInt(filter.limit));

      setLogs(filteredLogs);
    } finally {
      setLoading(false);
    }
  }, [filter, searchQuery]);

  useEffect(() => {
    if (mounted) loadLogs();
  }, [loadLogs, mounted]);

  const actionIcons: Record<string, any> = {
    LOGIN: LogIn,
    LOGOUT: LogOut,
    USER_CREATE: UserPlus,
    USER_UPDATE: Edit3,
    USER_DELETE: UserMinus,
    PRODUCT_CREATE: Package,
    PRODUCT_UPDATE: Edit3,
    PRODUCT_DELETE: Trash2,
    ORDER_UPDATE: ShoppingCart,
    PASSWORD_RESET: KeyRound,
    FAILED_LOGIN: AlertTriangle,
    SUSPICIOUS_ACTIVITY: Shield,
  };

  const actionColors: Record<string, string> = {
    LOGIN: "from-emerald-500 to-teal-500",
    LOGOUT: "from-slate-500 to-gray-500",
    USER_CREATE: "from-blue-500 to-indigo-500",
    USER_UPDATE: "from-orange-500 to-amber-500",
    USER_DELETE: "from-red-500 to-pink-500",
    PRODUCT_CREATE: "from-purple-500 to-pink-500",
    PRODUCT_UPDATE: "from-orange-500 to-amber-500",
    PRODUCT_DELETE: "from-red-500 to-pink-500",
    ORDER_UPDATE: "from-blue-500 to-indigo-500",
    PASSWORD_RESET: "from-yellow-500 to-orange-500",
    FAILED_LOGIN: "from-red-500 to-pink-500",
    SUSPICIOUS_ACTIVITY: "from-red-600 to-red-500",
  };

  const formatDetails = (details: unknown): string => {
    if (!details) return "";
    if (typeof details === "string") return details;
    return JSON.stringify(details, null, 2);
  };

  const toggleLogExpansion = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const getBrowserName = (userAgent: string): string => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("curl")) return "cURL";
    if (userAgent.includes("Python")) return "Python Script";
    return "Unknown";
  };

  const getRiskLevel = (
    action: string,
    success: boolean
  ): "LOW" | "MEDIUM" | "HIGH" => {
    if (
      !success &&
      (action === "FAILED_LOGIN" || action === "SUSPICIOUS_ACTIVITY")
    )
      return "HIGH";
    if (action.includes("DELETE")) return "MEDIUM";
    if (action === "LOGIN" && success) return "LOW";
    return "MEDIUM";
  };

  const getRiskColor = (risk: "LOW" | "MEDIUM" | "HIGH"): string => {
    switch (risk) {
      case "HIGH":
        return "from-red-500 to-pink-500";
      case "MEDIUM":
        return "from-orange-500 to-amber-500";
      case "LOW":
        return "from-emerald-500 to-teal-500";
    }
  };

  if (!mounted) {
    return null;
  }

  const stats = {
    total: logs.length,
    successful: logs.filter((log) => log.success).length,
    failed: logs.filter((log) => !log.success).length,
    uniqueUsers: new Set(logs.map((log) => log.email)).size,
    suspiciousActivity: logs.filter(
      (log) =>
        log.action === "SUSPICIOUS_ACTIVITY" || log.action === "FAILED_LOGIN"
    ).length,
  };

  return (
    <div className="admin-logs-page space-y-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      {/* Header Section with Stats */}
      <div className="relative z-10 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 shadow-2xl border border-white/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Audit Logs
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Monitor system activity and security events
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={loadLogs}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {stats.total}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Total Events
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {stats.successful}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Successful
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.failed}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Failed
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.uniqueUsers}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Unique Users
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.suspiciousActivity}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Security Alerts
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg rounded-xl">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>

            <Select
              value={filter.action}
              onValueChange={(v) => setFilter({ ...filter, action: v })}
            >
              <SelectTrigger className="h-11 bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 rounded-xl">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
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
                <SelectItem value="SUSPICIOUS_ACTIVITY">
                  Suspicious Activity
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter.success}
              onValueChange={(v) => setFilter({ ...filter, success: v })}
            >
              <SelectTrigger className="h-11 bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 rounded-xl">
                <SelectValue placeholder="All Results" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="success">Successful Only</SelectItem>
                <SelectItem value="failed">Failed Only</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter.timeRange}
              onValueChange={(v) => setFilter({ ...filter, timeRange: v })}
            >
              <SelectTrigger className="h-11 bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 rounded-xl">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter.limit}
              onValueChange={(v) => setFilter({ ...filter, limit: v })}
            >
              <SelectTrigger className="h-11 bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50 Results</SelectItem>
                <SelectItem value="100">100 Results</SelectItem>
                <SelectItem value="500">500 Results</SelectItem>
                <SelectItem value="1000">1000 Results</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearchQuery("");
                setFilter({
                  action: "all",
                  limit: "50",
                  user: "",
                  success: "all",
                  timeRange: "all",
                });
              }}
              variant="outline"
              className="h-11 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card className="backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg rounded-xl">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-600/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
                Recent Activity ({logs.length})
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 dark:border-slate-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center py-16">
              <RefreshCw className="h-8 w-8 animate-spin text-red-500 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                Loading audit logs...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => {
                const ActionIcon = actionIcons[log.action] || Shield;
                const isExpanded = expandedLogs.has(log._id);
                const riskLevel = getRiskLevel(log.action, log.success);

                return (
                  <div
                    key={log._id}
                    className="group border border-slate-200/50 dark:border-slate-600/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-white/40 dark:bg-slate-700/40 hover:bg-white/60 dark:hover:bg-slate-700/60"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animation: mounted
                        ? "slideInLeft 0.5s ease-out forwards"
                        : "none",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`p-2 bg-gradient-to-r ${
                              actionColors[log.action] ||
                              "from-slate-500 to-gray-500"
                            } rounded-lg shadow-md`}
                          >
                            <ActionIcon className="h-4 w-4 text-white" />
                          </div>
                          <Badge
                            className={`bg-gradient-to-r ${
                              actionColors[log.action] ||
                              "from-slate-500 to-gray-500"
                            } text-white border-0 text-sm`}
                          >
                            {log.action.replace("_", " ")}
                          </Badge>
                          <Badge
                            className={`bg-gradient-to-r ${getRiskColor(
                              riskLevel
                            )} text-white border-0 text-xs`}
                          >
                            {riskLevel} RISK
                          </Badge>
                          {!log.success && (
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-xs">
                              <XCircle className="h-3 w-3 mr-1" />
                              FAILED
                            </Badge>
                          )}
                          {log.success && (
                            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              SUCCESS
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-white">
                                {log.email}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                User
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Database className="h-4 w-4 text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-white">
                                {log.resourceType}
                                {log.resourceId &&
                                  ` (${log.resourceId.slice(-8)})`}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Resource
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-white">
                                {log.ipAddress}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                IP Address
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-white">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(log.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {log && (
                          <div className="mb-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleLogExpansion(log._id)}
                              className="h-8 px-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-3 w-3 mr-1" />
                              ) : (
                                <ChevronRight className="h-3 w-3 mr-1" />
                              )}
                              {isExpanded ? "Hide" : "Show"} Details
                            </Button>

                            {isExpanded && (
                              <div
                                className="mt-2 bg-slate-50 dark:bg-slate-800 rounded-lg p-3"
                                style={{ animation: "slideDown 0.3s ease-out" }}
                              >
                                <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre-wrap">
                                  {formatDetails(log.details)}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Monitor className="h-3 w-3 mr-1" />
                              {getBrowserName(log.userAgent)}
                            </div>
                            <div className="flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              ID: {log._id.slice(-6)}
                            </div>
                          </div>
                          <div className="text-right">
                            <p>{new Date(log.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {logs.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    No Logs Found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    No audit logs match your current filters.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        .admin-logs-page {
          font-size: 1.6rem;
        }

        .admin-logs-page * {
          font-size: inherit;
        }

        .admin-logs-page .text-xs {
          font-size: 1.2rem;
        }
        .admin-logs-page .text-sm {
          font-size: 1.4rem;
        }
        .admin-logs-page .text-base {
          font-size: 1.6rem;
        }
        .admin-logs-page .text-lg {
          font-size: 1.8rem;
        }
        .admin-logs-page .text-xl {
          font-size: 2rem;
        }
        .admin-logs-page .text-2xl {
          font-size: 2.4rem;
        }
        .admin-logs-page .text-3xl {
          font-size: 3rem;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
