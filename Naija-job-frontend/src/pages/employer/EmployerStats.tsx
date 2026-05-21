import type { ComponentType } from "react";
import { BarChart3, Briefcase, Clock, TrendingUp, Users } from "lucide-react";
import type { Job } from "../../types/job";

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  color,
}: {
  label: string;
  value: string | number;
  icon: ComponentType<{ size?: number; className?: string }>;
  trend?: string;
  color?: "amber";
}) => (
  <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2.5 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 group-hover:border-amber-500/30 transition-colors">
        <Icon size={20} className={color === "amber" ? "text-amber-400" : "text-slate-400 group-hover:text-amber-400 transition-colors"} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
          <TrendingUp size={10} />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">{label}</h3>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

export const EmployerStats = ({ jobs }: { jobs: Job[] }) => {
  const totalBudget = jobs.reduce((sum, job) => sum + Number(job.pay), 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
      <StatCard label="Service Requests" value={jobs.length} icon={Briefcase} trend="+2 this week" />
      <StatCard label="Active Requests" value={jobs.length} icon={BarChart3} color="amber" />
      <StatCard label="Open Offers" value="Review" icon={Clock} />
      <StatCard label="Total Budget" value={`NGN ${(totalBudget / 1000).toFixed(0)}k`} icon={Users} color="amber" />
    </div>
  );
};
