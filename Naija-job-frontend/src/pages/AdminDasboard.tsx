import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import api from "../api/axiosInstance";
import { PageLoader } from "../Ui/pageLoader";
import { AdminTabs } from "./admin/AdminTabs";
import { JobsPanel } from "./admin/JobsPanel";
import { NotificationsPanel } from "./admin/NotificationsPanel";
import { OverviewPanel } from "./admin/OverviewPanel";
import { UsersPanel } from "./admin/UsersPanel";
import type { AdminJob, AdminNotification, AdminTab, AdminUser, Stats } from "./admin/types";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
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

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = user.name || "";
      const email = user.email || "";

      return (
        name.toLowerCase().includes(userSearch.toLowerCase()) ||
        email.toLowerCase().includes(userSearch.toLowerCase())
      );
    });
  }, [users, userSearch]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = job.title || "";
      const company = job.company || "";

      return (
        title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        company.toLowerCase().includes(jobSearch.toLowerCase())
      );
    });
  }, [jobs, jobSearch]);

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
              prev.map((item) =>
                item._id === user._id ? { ...item, banned: !item.banned } : item
              )
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
    toast("Delete this request?", {
      description: `"${job.title}" by ${job.company} will be permanently removed.`,
      duration: 8000,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            setActionId(job._id);
            await api.delete(`/admin/jobs/${job._id}`);
            setJobs((prev) => prev.filter((item) => item._id !== job._id));
            toast.success("Request deleted");
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete request");
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
            setUsers((prev) => prev.filter((item) => item._id !== user._id));
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

  if (loading) {
    return <PageLoader label="Loading admin data" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage users, requests, offers, and platform activity.</p>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm"
          >
            <RefreshCw size={15} />
            <span className="hidden sm:block">Refresh</span>
          </button>
        </div>

        <AdminTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" && stats && (
          <OverviewPanel stats={stats} notifications={notifications} />
        )}

        {activeTab === "users" && (
          <UsersPanel
            users={filteredUsers}
            search={userSearch}
            actionId={actionId}
            onSearchChange={setUserSearch}
            onBanToggle={handleBanToggle}
            onDelete={handleDeleteUser}
          />
        )}

        {activeTab === "jobs" && (
          <JobsPanel
            jobs={filteredJobs}
            search={jobSearch}
            actionId={actionId}
            onSearchChange={setJobSearch}
            onDelete={handleDeleteJob}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationsPanel notifications={notifications} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
