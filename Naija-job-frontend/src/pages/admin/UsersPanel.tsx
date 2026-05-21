import { Ban, Loader2, Search, ShieldCheck, Trash2 } from "lucide-react";
import type { AdminUser } from "./types";
import { roleColors, safeDate } from "./utils";

interface UsersPanelProps {
  users: AdminUser[];
  search: string;
  actionId: string | null;
  onSearchChange: (value: string) => void;
  onBanToggle: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export const UsersPanel = ({
  users,
  search,
  actionId,
  onSearchChange,
  onBanToggle,
  onDelete,
}: UsersPanelProps) => (
  <div className="space-y-4">
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search users by name or email..."
        className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
      />
    </div>

    <p className="text-slate-500 text-xs">{users.length} users</p>

    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user._id}
          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
            user.banned
              ? "bg-red-500/5 border-red-500/20"
              : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white font-semibold text-sm">{user.name || "Unknown User"}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${roleColors[user.role]}`}>
                {user.role || "N/A"}
              </span>
              {user.banned && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Banned
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs mt-0.5 truncate">{user.email || "No email"}</p>
            <p className="text-slate-600 text-xs mt-0.5">Joined {safeDate(user.createdAt)}</p>
          </div>

          {user.role !== "admin" && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onBanToggle(user)}
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
                onClick={() => onDelete(user)}
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
);
