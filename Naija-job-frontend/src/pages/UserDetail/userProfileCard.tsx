import { Ban, Loader2, Mail, ShieldCheck, Trash2 } from "lucide-react";
import type { AdminUser } from "../admin/types";
import { roleColors, safeDate } from "../admin/utils";

interface UserProfileCardProps {
  user: AdminUser;
  actionId: string | null;
  onBanToggle: () => void;
  onDelete: () => void;
}

export const UserProfileCard = ({ user, actionId, onBanToggle, onDelete }: UserProfileCardProps) => {
  const isActioning = actionId === user._id;

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${
      user.banned
        ? "bg-red-500/5 border-red-500/20"
        : "bg-slate-900/60 border-slate-800"
    }`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-white font-bold text-lg">{user.name}</h1>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${roleColors[user.role]}`}>
                {user.role}
              </span>
              {user.banned && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Banned
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-0.5">
              <Mail size={12} />
              {user.email}
            </p>
            <p className="text-slate-600 text-xs mt-0.5">
              Joined {safeDate(user.createdAt)}
            </p>
          </div>
        </div>

        {/* Actions */}
        {user.role !== "admin" && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBanToggle}
              disabled={isActioning}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all disabled:opacity-50 ${
                user.banned
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
              }`}
            >
              {isActioning ? (
                <Loader2 size={14} className="animate-spin" />
              ) : user.banned ? (
                <ShieldCheck size={14} />
              ) : (
                <Ban size={14} />
              )}
              {user.banned ? "Unban" : "Ban"}
            </button>

            <button
              onClick={onDelete}
              disabled={isActioning}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border bg-red-500/5 border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-all disabled:opacity-50"
            >
              {isActioning ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};