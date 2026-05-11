import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "sonner";
import {
  Users, Briefcase, BarChart3, ShieldX,
  Loader2, Trash2, Ban, ShieldCheck,
  Bell, TrendingUp, UserCircle2, Search,
  RefreshCw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PageLoader } from "../Ui/pageLoader";

// ── Types ────────────────────────────────────
interface Stats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  employers: number;
  employees: number;
  bannedUsers: number;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "employee" | "employer" | "admin";
  banned: boolean;
  createdAt: string;
}

interface AdminJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  jobType: string;
  category: string;
  createdAt: string;
  createdBy: { name: string; email: string };
}

interface Notification {
  _id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

type Tab = "overview" | "users" | "jobs" | "notifications";

// ── Stat Card ────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color, sub }: any) => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2.5 rounded-xl border ${color}`}>
        <Icon size={18} />
      </div>
    </div>
    <p className="text-3xl font-black text-white tracking-tight">{value}</p>
    <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">{label}</p>
    {sub && <p className="text-slate-600 text-xs mt-0.5">{sub}</p>}
  </div>
);

const safeDate = (date?: string) => {
  if (!date) return "Unknown date";

  const parsed = new Date(date);

  return isNaN(parsed.getTime())
    ? "Unknown date"
    : formatDistanceToNow(parsed, { addSuffix: true });
};

// ── Main Component ───────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [jobSearch, setJobSearch] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, jobsRes, notifsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/admin/jobs"),
        api.get("/notifications"),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setJobs(jobsRes.data);
      setNotifications(notifsRes.data.notifications);
    } catch {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleBanToggle = (user: AdminUser) => {
    const action = user.banned ? "unban" : "ban";
    toast(`${user.banned ? "Unban" : "Ban"} ${user.name}?`, {
      description: user.banned
        ? "This user will regain access to the platform."
        : "This user will lose access to the platform.",
      duration: 8000,
      action: {
        label: user.banned ? "Unban" : "Ban",
        onClick: async () => {
          try {
            setActionId(user._id);
            await api.patch(`/admin/users/${user._id}/${action}`);
            setUsers((prev) =>
              prev.map((u) => u._id === user._id ? { ...u, banned: !u.banned } : u)
            );
            toast.success(`${user.name} has been ${action}ned`);
          } catch (err: any) {
            toast.error(err.response?.data?.message || `Failed to ${action} user`);
          } finally {
            setActionId(null);
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  const handleDeleteJob = (job: AdminJob) => {
    toast("Delete this job?", {
      description: `"${job.title}" by ${job.company} will be permanently removed.`,
      duration: 8000,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            setActionId(job._id);
            await api.delete(`/admin/jobs/${job._id}`);
            setJobs((prev) => prev.filter((j) => j._id !== job._id));
            toast.success("Job deleted");
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete job");
          } finally {
            setActionId(null);
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  const handleDeleteUser = (user: AdminUser) => {
    toast("Delete this user?", {
      description: `${user.name}'s account will be permanently removed.`,
      duration: 8000,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            setActionId(user._id);
            await api.delete(`/admin/users/${user._id}`);
            setUsers((prev) => prev.filter((u) => u._id !== user._id));
            toast.success("User deleted");
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete user");
          } finally {
            setActionId(null);
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

const filteredUsers = users.filter((u) => {
  const name = u.name || "";
  const email = u.email || "";

  return (
    name.toLowerCase().includes(userSearch.toLowerCase()) ||
    email.toLowerCase().includes(userSearch.toLowerCase())
  );
});

const filteredJobs = jobs.filter((j) => {
  const title = j.title || "";
  const company = j.company || "";

  return (
    title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    company.toLowerCase().includes(jobSearch.toLowerCase())
  );
});

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview",      label: "Overview",      icon: BarChart3   },
    { id: "users",         label: "Users",         icon: Users       },
    { id: "jobs",          label: "Jobs",          icon: Briefcase   },
    { id: "notifications", label: "Notifications", icon: Bell        },
  ];

  const roleColors: Record<string, string> = {
    admin:    "bg-purple-500/10 text-purple-400 border-purple-500/20",
    employer: "bg-amber-500/10  text-amber-400  border-amber-500/20",
    employee: "bg-blue-500/10   text-blue-400   border-blue-500/20",
  };

  if (loading) {
    return <PageLoader label="Loading admin data" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">

        {/* ── Header ──────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage users, jobs and platform activity</p>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm"
          >
            <RefreshCw size={15} />
            <span className="hidden sm:block">Refresh</span>
          </button>
        </div>

        {/* ── Tabs ────────────────────────────── */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-8 bg-slate-900/40 rounded-2xl p-1.5 border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                  : "text-slate-500 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Overview ────────────────────────── */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard label="Total Users"        value={stats.totalUsers}        icon={Users}     color="bg-blue-500/10 border-blue-500/20 text-blue-400"    />
              <StatCard label="Total Jobs"          value={stats.totalJobs}         icon={Briefcase} color="bg-amber-500/10 border-amber-500/20 text-amber-400"  />
              <StatCard label="Applications"        value={stats.totalApplications} icon={BarChart3} color="bg-emerald-500/10 border-emerald-500/20 text-emerald-400" />
              <StatCard label="Employers"           value={stats.employers}         icon={TrendingUp} color="bg-purple-500/10 border-purple-500/20 text-purple-400" />
              <StatCard label="Employees"           value={stats.employees}         icon={UserCircle2} color="bg-cyan-500/10 border-cyan-500/20 text-cyan-400" />
              <StatCard label="Banned Users"        value={stats.bannedUsers}       icon={ShieldX}   color="bg-red-500/10 border-red-500/20 text-red-400"        />
            </div>

            {/* Recent activity */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Recent Notifications</h2>
              <div className="space-y-3">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n._id}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                      n.read ? "bg-slate-900/30 border-slate-800/50 opacity-60" : "bg-slate-900/60 border-slate-700/50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <Bell size={15} className="text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{n.message}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {safeDate(n.createdAt)}
                      </p>
                    </div>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Users ───────────────────────────── */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
              />
            </div>

            <p className="text-slate-500 text-xs">{filteredUsers.length} users</p>

            {/* Users list */}
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    user.banned
                      ? "bg-red-500/5 border-red-500/20"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                   {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold text-sm"><p className="text-white font-semibold text-sm">
                        {user.name || "Unknown User"}
                      </p>
                      </p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${roleColors[user.role]}`}>
                        {user.role || "N/A"}
                      </span>
                      {user.banned && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                          Banned
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 truncate"><p className="text-slate-500 text-xs mt-0.5 truncate">
                      {user.email || "No email"}
                  </p>
                  </p>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Joined {safeDate(user.createdAt)}
                    </p>
                  </div>
                  {/* Actions */}
                  {user.role !== "admin" && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleBanToggle(user)}
                        disabled={actionId === user._id}
                        title={user.banned ? "Unban user" : "Ban user"}
                        className={`p-2 rounded-xl border transition-all text-xs font-medium flex items-center gap-1.5 ${
                          user.banned
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
                        } disabled:opacity-50`}
                      >
                        {actionId === user._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : user.banned ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <Ban size={14} />
                        )}
                        <span className="hidden sm:block">{user.banned ? "Unban" : "Ban"}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user)}
                        disabled={actionId === user._id}
                        title="Delete user"
                        className="p-2 rounded-xl border bg-red-500/5 border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      >
                        {actionId === user._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Jobs ────────────────────────────── */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Search jobs by title or company..."
                className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
              />
            </div>

            <p className="text-slate-500 text-xs">{filteredJobs.length} jobs</p>

            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Briefcase size={16} className="text-amber-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold text-sm"><p className="text-white font-semibold text-sm">
                        {job.title || "Untitled Job"}
                    </p>
                    </p>
                      {job.jobType && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {job.jobType || "N/A"}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">{job.company} · {job.location || "Location not specified"}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-emerald-400 text-xs font-semibold">
                        <p className="text-emerald-400 text-xs font-semibold">
                          ₦{job.salary?.toLocaleString?.() || "0"}/mo
                      </p>
                      </p>
                      <p className="text-slate-600 text-xs">
                        by {job.createdBy?.name || "Unknown Employer"}
                      </p>
                      <p className="text-slate-600 text-xs">
                        {job.createdAt? 
                        safeDate(job.createdAt)
                        : "Unknown date"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteJob(job)}
                    disabled={actionId === job._id}
                    title="Delete job"
                    className="p-2 rounded-xl border bg-red-500/5 border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 shrink-0"
                  >
                    {actionId === job._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Notifications ────────────────────── */}
        {activeTab === "notifications" && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Bell size={40} className="text-slate-700 mb-4" />
                <p className="text-slate-500 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                    n.read
                      ? "bg-slate-900/30 border-slate-800/50 opacity-60"
                      : "bg-slate-900/60 border-slate-700/50"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Bell size={15} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{n.message}</p>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{n.type.replace(/_/g, " ")}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {n.createdAt ? safeDate(n.createdAt) : "Unknown date"}
                    </p>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
