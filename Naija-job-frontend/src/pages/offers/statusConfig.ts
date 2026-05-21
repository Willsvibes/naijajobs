import type { ApplicationStatus } from "../../types/application";

export const offerStatusConfig: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  accepted: {
    label: "Accepted",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  rejected: {
    label: "Declined",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  completed: {
    label: "Completed",
    className: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  },
};
