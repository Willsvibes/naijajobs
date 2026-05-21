import { Bell } from "lucide-react";
import type { AdminNotification } from "./types";
import { safeDate } from "./utils";

interface NotificationsPanelProps {
  notifications: AdminNotification[];
}

export const NotificationsPanel = ({ notifications }: NotificationsPanelProps) => (
  <div className="space-y-3">
    {notifications.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Bell size={40} className="text-slate-700 mb-4" />
        <p className="text-slate-500 text-sm">No notifications yet</p>
      </div>
    ) : (
      notifications.map((notification) => (
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
          <div className="flex-1">
            <p className="text-sm text-white font-medium">{notification.message}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">
              {notification.type.replace(/_/g, " ")}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">{safeDate(notification.createdAt)}</p>
          </div>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
          )}
        </div>
      ))
    )}
  </div>
);
