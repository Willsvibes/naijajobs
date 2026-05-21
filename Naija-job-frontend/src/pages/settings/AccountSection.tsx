import { ChevronRight, LogOut } from "lucide-react";
import { FieldRow, SectionHeader } from "./SettingsShared";
import type { SettingsUser } from "./types";

interface AccountSectionProps {
  user: SettingsUser | null;
  onLogout: () => void;
}

export const AccountSection = ({ user, onLogout }: AccountSectionProps) => (
  <div>
    <SectionHeader title="Account" description="Your personal information" />

    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800/60">
      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-black text-black shadow-lg shadow-amber-500/20 shrink-0">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="text-white font-bold">{user?.name}</p>
        <p className="text-slate-400 text-sm">{user?.email}</p>
        <span className="inline-flex items-center mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
          {user?.role}
        </span>
      </div>
    </div>

    <div className="mb-8">
      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
        Basic Info
      </p>
      <div className="bg-slate-800/30 rounded-2xl px-5 border border-slate-700/30">
        <FieldRow label="Name" value={user?.name || "-"} />
        <FieldRow label="Email" value={user?.email || "-"} hint="Cannot be changed" />
        <FieldRow label="Role" value={user?.role || "-"} />
      </div>
    </div>

    <button
      type="button"
      onClick={onLogout}
      className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 text-slate-300 hover:text-white hover:border-slate-600 transition-all group"
    >
      <LogOut size={18} className="text-slate-500 group-hover:text-white transition-colors" />
      <span className="text-sm font-medium">Sign Out</span>
      <ChevronRight size={16} className="text-slate-600 ml-auto" />
    </button>
  </div>
);
