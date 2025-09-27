"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AdminUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "Admin",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function loadAdmins() {
    setLoading(true);
    const res = await fetch("/api/admin/admins", { credentials: "include" });
    const data = await res.json();
    setAdmins(data.admins || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function createAdmin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const csrf =
      document.cookie
        .split("; ")
        .find((r) => r.startsWith("csrfToken="))
        ?.split("=")[1] || "";
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrf,
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create admin");
      return;
    }

    setCreating(false);
    setForm({
      email: "",
      firstName: "",
      lastName: "",
      role: "Admin",
      password: "",
    });
    await loadAdmins();
  }

  async function toggleActive(admin: AdminUser) {
    const csrf =
      document.cookie
        .split("; ")
        .find((r) => r.startsWith("csrfToken="))
        ?.split("=")[1] || "";
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrf,
      },
      credentials: "include",
      body: JSON.stringify({ id: admin._id, isActive: !admin.isActive }),
    });
    await loadAdmins();
  }

  async function changeRole(admin: AdminUser, role: string) {
    const csrf =
      document.cookie
        .split("; ")
        .find((r) => r.startsWith("csrfToken="))
        ?.split("=")[1] || "";
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrf,
      },
      credentials: "include",
      body: JSON.stringify({ id: admin._id, role }),
    });
    if (res.status === 401) alert("Please re-authenticate for role changes.");
    await loadAdmins();
  }

  async function removeAdmin(admin: AdminUser) {
    if (!confirm(`Remove ${admin.firstName} ${admin.lastName}?`)) return;

    const csrf =
      document.cookie
        .split("; ")
        .find((r) => r.startsWith("csrfToken="))
        ?.split("=")[1] || "";
    const res = await fetch(`/api/admin/users?id=${admin._id}`, {
      method: "DELETE",
      headers: { "x-csrf-token": csrf },
      credentials: "include",
    });
    if (res.status === 401) alert("Please re-authenticate to remove admin.");
    await loadAdmins();
  }

  async function reauth() {
    const password = prompt("Re-enter your password for confirmation");
    if (!password) return;
    const res = await fetch("/api/auth/reauth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (!res.ok) alert("Re-authentication failed");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-sm md:text-base">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            Admin & Moderator Management
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage Admin and Moderator accounts (SuperAdmin creation is
            restricted to scripts only)
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="text-xs md:text-sm"
            onClick={reauth}
          >
            Re-authenticate
          </Button>
          <Button
            className="text-xs md:text-sm"
            onClick={() => setCreating(!creating)}
          >
            {creating ? "Cancel" : "Add Admin/Moderator"}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-xs md:text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Create Admin Form */}
      {creating && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm md:text-base">
              Create Admin or Moderator Account
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs md:text-sm">
            <form
              className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
              onSubmit={createAdmin}
            >
              <div className="md:col-span-2">
                <Label className="text-xs md:text-sm">Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  required
                  className="text-xs md:text-sm"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm">First Name</Label>
                <Input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  required
                  className="text-xs md:text-sm"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Last Name</Label>
                <Input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  required
                  className="text-xs md:text-sm"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => setForm({ ...form, role: v })}
                >
                  <SelectTrigger className="text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-xs md:text-sm">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs md:text-sm">Temporary Password</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="text-xs md:text-sm"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Min 12 chars, upper, lower, number, special character
                </p>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="text-xs md:text-sm">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Admin & Moderator Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm md:text-base">
            Admin & Moderator Accounts ({admins.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs md:text-sm">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="uppercase text-[10px] md:text-xs">
                  <tr className="text-left border-b">
                    <th className="py-2">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin._id} className="border-b">
                      <td className="py-2">
                        {admin.firstName} {admin.lastName}
                      </td>
                      <td>{admin.email}</td>
                      <td>
                        <Select
                          defaultValue={admin.role}
                          onValueChange={(v) => changeRole(admin, v)}
                        >
                          <SelectTrigger className="w-[120px] text-xs md:text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="text-xs md:text-sm">
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Moderator">Moderator</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td>
                        <Badge
                          className="text-[10px] md:text-xs"
                          variant={admin.isActive ? "default" : "secondary"}
                        >
                          {admin.isActive ? "Active" : "Suspended"}
                        </Badge>
                      </td>
                      <td className="text-[10px] text-muted-foreground">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </td>
                      <td className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[10px] md:text-xs"
                          onClick={() => toggleActive(admin)}
                        >
                          {admin.isActive ? "Suspend" : "Activate"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-[10px] md:text-xs"
                          onClick={() => removeAdmin(admin)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {admins.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-xs">
                  No admin or moderator accounts found
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
