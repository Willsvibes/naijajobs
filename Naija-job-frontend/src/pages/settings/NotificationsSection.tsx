import { SectionHeader, Toggle } from "./SettingsShared";
import type { NotificationPrefs } from "./types";

const notificationRows: Array<{
  key: keyof NotificationPrefs;
  label: string;
  desc: string;
}> = [
  {
    key: "applicationUpdates",
    label: "Application updates",
    desc: "When your application status changes",
  },
  { key: "newJobAlerts", label: "New job alerts", desc: "Jobs matching your profile" },
  {
    key: "emailNotifications",
    label: "Email notifications",
    desc: "Receive updates via email",
  },
  {
    key: "pushNotifications",
    label: "Push notifications",
    desc: "In-app real-time alerts",
  },
];

interface NotificationsSectionProps {
  notifs: NotificationPrefs;
  onChange: (notifs: NotificationPrefs) => void;
}

export const NotificationsSection = ({
  notifs,
  onChange,
}: NotificationsSectionProps) => (
  <div>
    <SectionHeader
      title="Notifications"
      description="Choose what you want to hear about"
    />

    <div className="space-y-3">
      {notificationRows.map(({ key, label, desc }) => (
        <div
          key={key}
          className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-colors"
        >
          <div>
            <p className="text-white text-sm font-medium">{label}</p>
            <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
          </div>
          <Toggle
            enabled={notifs[key]}
            onChange={() => onChange({ ...notifs, [key]: !notifs[key] })}
          />
        </div>
      ))}
    </div>
  </div>
);
