import { Bell, CheckCheck, Loader2 } from "lucide-react";

interface NotificationsHeaderProps {
  unreadCount: number;
  markingAll: boolean;
  onMarkAllRead: () => void;
}

export const NotificationsHeader = ({
  unreadCount,
  markingAll,
  onMarkAllRead,
}: NotificationsHeaderProps) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Bell size={28} className="text-amber-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-black text-white">Notifications</h1>
        <p className="text-slate-500 text-sm">
          {unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
            : "You're all caught up"}
        </p>
      </div>
    </div>

    {unreadCount > 0 && (
      <button
        type="button"
        onClick={onMarkAllRead}
        disabled={markingAll}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors disabled:opacity-50"
      >
        {markingAll ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <CheckCheck size={16} />
        )}
        Mark all read
      </button>
    )}
  </div>
);
