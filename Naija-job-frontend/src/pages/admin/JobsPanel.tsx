import { Briefcase, Loader2, Search, Trash2 } from "lucide-react";
import type { AdminJob } from "./types";
import { safeDate } from "./utils";

interface JobsPanelProps {
  jobs: AdminJob[];
  search: string;
  actionId: string | null;
  onSearchChange: (value: string) => void;
  onDelete: (job: AdminJob) => void;
}

export const JobsPanel = ({ jobs, search, actionId, onSearchChange, onDelete }: JobsPanelProps) => (
  <div className="space-y-4">
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search requests by title or client..."
        className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
      />
    </div>

    <p className="text-slate-500 text-xs">{jobs.length} requests</p>

    <div className="space-y-3">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Briefcase size={16} className="text-amber-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white font-semibold text-sm">{job.title || "Untitled Request"}</p>
              {job.jobType && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {job.jobType}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              {job.company} - {job.location || "Location not specified"}
            </p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <p className="text-emerald-400 text-xs font-semibold">
                NGN {job.salary?.toLocaleString?.() || "0"}
              </p>
              <p className="text-slate-600 text-xs">
                by {job.createdBy?.name || "Unknown Client"}
              </p>
              <p className="text-slate-600 text-xs">{safeDate(job.createdAt)}</p>
            </div>
          </div>

          <button
            onClick={() => onDelete(job)}
            disabled={actionId === job._id}
            title="Delete request"
            className="p-2 rounded-xl border bg-red-500/5 border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 shrink-0"
          >
            {actionId === job._id ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
);
