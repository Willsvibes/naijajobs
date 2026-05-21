import { formatDistanceToNow } from "date-fns";
import type { Notification } from "./types";
import { notificationTypeConfig } from "./notificationConfig";
import { ApplicationPreview } from "./ApplicationPreview";

interface NotificationItemProps {
  notification: Notification;
  updatingApplicationId: string | null;
  onMarkRead: (id: string) => void;
  onUpdateApplicationStatus: (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => void;
}

export const NotificationItem = ({
  notification,
  updatingApplicationId,
  onMarkRead,
  onUpdateApplicationStatus,
}: NotificationItemProps) => {
  const config = notificationTypeConfig[notification.type];

  return (
    <div
      onClick={() => !notification.read && onMarkRead(notification._id)}
      className={`relative flex gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
        notification.read
          ? "bg-slate-900/40 border-slate-800/50 opacity-70"
          : "bg-slate-900 border-slate-700/50 hover:border-slate-600"
      }`}
    >
      {!notification.read && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-500" />
      )}

      <div
        className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${config.bg} ${config.color}`}
      >
        {config.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-snug ${
            notification.read ? "text-slate-400" : "text-white font-medium"
          }`}
        >
          {notification.message}
        </p>

        {notification.job && (
          <p className="text-xs text-slate-500 mt-1">
            {notification.job.title} - {notification.job.company}
          </p>
        )}

        {notification.type === "new_application" && notification.application && (
          <ApplicationPreview
            application={notification.application}
            updatingApplicationId={updatingApplicationId}
            onUpdateApplicationStatus={onUpdateApplicationStatus}
          />
        )}

        <p className="text-xs text-slate-600 mt-1.5">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};
