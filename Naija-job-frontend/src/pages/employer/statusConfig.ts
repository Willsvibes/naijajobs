import type { ApplicationStatus } from "../../types/application";

export const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  reviewed: { label: "Reviewed", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  accepted: { label: "Accepted", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  rejected: { label: "Declined", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  in_progress: { label: "In Progress", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  completed: { label: "Completed", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  cancelled: { label: "Cancelled", color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20" },
};
