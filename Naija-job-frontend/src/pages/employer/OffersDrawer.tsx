import { CheckCircle, Eye, Loader2, UserCircle2, X, XCircle } from "lucide-react";
import type { Job } from "../../types/job";
import type { ApplicationStatus } from "../../types/application";
import type { EmployerApplication } from "./types";
import { statusConfig } from "./statusConfig";

interface OffersDrawerProps {
  selectedJob: Job;
  applications: EmployerApplication[];
  loadingApps: boolean;
  updatingId: string | null;
  onClose: () => void;
  onUpdateStatus: (applicationId: string, status: ApplicationStatus) => void;
}

export const OffersDrawer = ({
  selectedJob,
  applications,
  loadingApps,
  updatingId,
  onClose,
  onUpdateStatus,
}: OffersDrawerProps) => (
  <>
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
    <div className="fixed inset-0 sm:inset-auto sm:right-0 sm:top-0 sm:h-full sm:w-[480px] bg-slate-900 border-t sm:border-t-0 sm:border-l border-slate-800 z-50 flex flex-col shadow-2xl rounded-t-3xl sm:rounded-none">
      <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{selectedJob.title}</h2>
          <p className="text-slate-400 text-sm mt-0.5">{selectedJob.company}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {loadingApps ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="text-amber-500 animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <UserCircle2 size={48} className="text-slate-700 mb-4" />
            <p className="text-slate-500 text-sm">No offers yet for this request</p>
          </div>
        ) : (
          applications.map((app) => {
            const config = statusConfig[app.status];
            const isTerminal = app.status === "accepted" || app.status === "rejected";

            return (
              <div
                key={app._id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 sm:p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                      {app.applicant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{app.applicant.name}</p>
                      <p className="text-slate-400 text-xs">{app.applicant.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                </div>

                {app.applicant.skills && app.applicant.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {app.applicant.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded-md border border-slate-600/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {app.proposal && (
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                    {app.proposal}
                  </p>
                )}

                {app.portfolioImages && app.portfolioImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {app.portfolioImages.slice(0, 3).map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`Previous work ${index + 1}`}
                        className="h-20 w-full rounded-lg object-cover border border-slate-700 bg-slate-800"
                      />
                    ))}
                  </div>
                )}

                {!isTerminal ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onUpdateStatus(app._id, "accepted")}
                      disabled={updatingId === app._id}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-medium disabled:opacity-50"
                    >
                      {updatingId === app._id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                      Accept
                    </button>
                    <button
                      onClick={() => onUpdateStatus(app._id, "reviewed")}
                      disabled={updatingId === app._id}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-medium disabled:opacity-50"
                    >
                      <Eye size={12} />
                      Review
                    </button>
                    <button
                      onClick={() => onUpdateStatus(app._id, "rejected")}
                      disabled={updatingId === app._id}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium disabled:opacity-50"
                    >
                      <XCircle size={12} />
                      Decline
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onUpdateStatus(app._id, "pending")}
                    disabled={updatingId === app._id}
                    className="w-full py-2 rounded-xl bg-slate-700/50 border border-slate-600/50 text-slate-400 hover:text-white transition-all text-xs font-medium"
                  >
                    Reset to Pending
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  </>
);
