import { BarChart3, Bell, Briefcase, Users } from "lucide-react";
import type { AdminTab } from "./types";

interface AdminTabsProps {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "jobs", label: "Requests", icon: Briefcase },
  { id: "notifications", label: "Notifications", icon: Bell },
] satisfies Array<{ id: AdminTab; label: string; icon: typeof BarChart3 }>;

export const AdminTabs = ({ activeTab, onChange }: AdminTabsProps) => (
  <div className="flex gap-1 overflow-x-auto pb-1 mb-8 bg-slate-900/40 rounded-2xl p-1.5 border border-slate-800">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
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
);
