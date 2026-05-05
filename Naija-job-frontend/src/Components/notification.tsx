import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import {
  Bell,
  BriefcaseBusiness,
  CheckCheck,
  CircleUser,
  UserPlus,
  Loader2,
  MailOpen,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  _id: string;
  type:
    | "new_application"
    | "application_update"
    | "new_job_posted"
    | "new_user_registered";
  message: string;
  read: boolean;
  createdAt: string;
  sender: { name: string; email: string };
  job?: { title: string; company: string };
}

const typeConfig: Record<
  Notification["type"],
  { icon: React.ReactNode; color: string; bg: string }
> = {
  new_application: {
    icon: <BriefcaseBusiness size={18} />,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  application_update: {
    icon: <CircleUser size={18} />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  new_job_posted: {
    icon: <BriefcaseBusiness size={18} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  new_user_registered: {
    icon: <UserPlus size={18} />,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
};

const Notifications = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications");
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markOneRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const markAllRead = async () => {
    try {
      setMarkingAll(true);
      await api.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
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
              onClick={markAllRead}
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

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={32} className="text-amber-500 animate-spin" />
            <p className="text-slate-500 text-sm">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center">
              <MailOpen size={28} className="text-slate-600" />
            </div>
            <p className="text-slate-500 text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => {
              const config = typeConfig[n.type];
              return (
                <div
                  key={n._id}
                  onClick={() => !n.read && markOneRead(n._id)}
                  className={`relative flex gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                    ${n.read
                      ? "bg-slate-900/40 border-slate-800/50 opacity-70"
                      : "bg-slate-900 border-slate-700/50 hover:border-slate-600"
                    }`}
                >
                  {/* Unread dot */}
                  {!n.read && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-500" />
                  )}

                  {/* Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${config.bg} ${config.color}`}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-snug ${
                        n.read ? "text-slate-400" : "text-white font-medium"
                      }`}
                    >
                      {n.message}
                    </p>

                    {n.job && (
                      <p className="text-xs text-slate-500 mt-1">
                        {n.job.title} · {n.job.company}
                      </p>
                    )}

                    <p className="text-xs text-slate-600 mt-1.5">
                      {formatDistanceToNow(new Date(n.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;