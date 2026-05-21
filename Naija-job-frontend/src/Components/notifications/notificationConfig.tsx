import type { ReactNode } from "react";
import { BriefcaseBusiness, CircleUser, UserPlus } from "lucide-react";
import type { Notification } from "./types";

export const notificationTypeConfig: Record<
  Notification["type"],
  { icon: ReactNode; color: string; bg: string }
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
