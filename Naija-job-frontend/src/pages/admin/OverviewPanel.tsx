import { BarChart3, Bell, Briefcase, ShieldX, TrendingUp, UserCircle2, Users } from "lucide-react";
import { StatCard } from "./StatCard";
import type { AdminNotification, Stats } from "./types";
import { safeDate } from "./utils";

interface OverviewPanelProps {
  stats: Stats;
  notifications: AdminNotification[];
}

export const OverviewPanel = ({ stats, notifications }: OverviewPanelProps) => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard label="Total Users" value={stats.totalUsers} icon={Users} color="bg-blue-500/10 border-blue-500/20 text-blue-400" />
      <StatCard label="Services" value={stats.totalJobs} icon={Briefcase} color="bg-amber-500/10 border-amber-500/20 text-amber-400" />
      <StatCard label="Offers" value={stats.totalApplications} icon={BarChart3} color="bg-emerald-500/10 border-emerald-500/20 text-emerald-400" />
      <StatCard label="Clients" value={stats.employers} icon={TrendingUp} color="bg-purple-500/10 border-purple-500/20 text-purple-400" />
      <StatCard label="Providers" value={stats.employees} icon={UserCircle2} color="bg-cyan-500/10 border-cyan-500/20 text-cyan-400" />
      <StatCard label="Banned Users" value={stats.bannedUsers} icon={ShieldX} color="bg-red-500/10 border-red-500/20 text-red-400" />
    </div>

    <div>
      <h2 className="text-lg font-bold text-white mb-4">Recent Notifications</h2>
      <div className="space-y-3">
        {notifications.slice(0, 5).map((notification) => (
          <div
            key={notification._id}
            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
              notification.read
                ? "bg-slate-900/30 border-slate-800/50 opacity-60"
                : "bg-slate-900/60 border-slate-700/50"
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Bell size={15} className="text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium">{notification.message}</p>
              <p className="text-xs text-slate-500 mt-1">{safeDate(notification.createdAt)}</p>
            </div>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
