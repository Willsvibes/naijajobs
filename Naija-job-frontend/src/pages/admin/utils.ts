import { formatDistanceToNow } from "date-fns";

export const safeDate = (date?: string) => {
  if (!date) return "Unknown date";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "Unknown date"
    : formatDistanceToNow(parsed, { addSuffix: true });
};

export const roleColors: Record<string, string> = {
  admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  employer: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  employee: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};
