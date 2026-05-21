import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { PageLoader } from "../Ui/pageLoader";
import { NotificationItem } from "./notifications/NotificationItem";
import { NotificationsEmptyState } from "./notifications/NotificationsEmptyState";
import { NotificationsHeader } from "./notifications/NotificationsHeader";
import type { Notification } from "./notifications/types";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [updatingApplicationId, setUpdatingApplicationId] = useState<string | null>(null);

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

  const updateApplicationStatus = async (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      setUpdatingApplicationId(applicationId);
      const res = await api.patch(`/applications/${applicationId}/status`, { status });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.application?._id === applicationId
            ? {
                ...notification,
                application: {
                  ...notification.application,
                  status: res.data.application.status,
                },
              }
            : notification
        )
      );
    } catch (err) {
      console.error("Failed to update application status", err);
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <NotificationsHeader
          unreadCount={unreadCount}
          markingAll={markingAll}
          onMarkAllRead={markAllRead}
        />

        {loading ? (
          <PageLoader label="Loading notifications" fullScreen={false} />
        ) : notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                updatingApplicationId={updatingApplicationId}
                onMarkRead={markOneRead}
                onUpdateApplicationStatus={updateApplicationStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
