import { MailOpen } from "lucide-react";

export const NotificationsEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center">
      <MailOpen size={28} className="text-slate-600" />
    </div>
    <p className="text-slate-500 text-sm">No notifications yet</p>
  </div>
);
