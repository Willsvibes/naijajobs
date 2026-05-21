import type { ComponentType } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ComponentType<{ size?: number }>;
  color: string;
  sub?: string;
}

export const StatCard = ({ label, value, icon: Icon, color, sub }: StatCardProps) => (
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
