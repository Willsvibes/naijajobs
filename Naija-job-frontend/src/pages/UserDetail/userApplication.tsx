import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router";
import { safeDate } from "../admin/utils";

export interface UserApplication {
  _id: string;
  status: string;
  createdAt: string;
  job?: { _id: string; title: string; company: string; location: string };
}

const statusColors: Record<string, string> = {
  pending:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface UserApplicationsListProps {
  applications: UserApplication[];
}

export const UserApplicationsList = ({ applications }: UserApplicationsListProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ClipboardList size={15} className="text-amber-400" />
        <h2 className="text-white font-semibold text-sm">
          Applications{" "}
          <span className="text-slate-500 font-normal">({applications.length})</span>
        </h2>
      </div>

      {applications.length === 0 ? (
        <p className="text-slate-600 text-sm">No applications yet.</p>
      ) : (
        <div className="space-y-2">
          {applications.map((app) => (
            <div
              key={app._id}
              onClick={() => app.job && navigate(`/job/${app.job._id}`)}
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">
                  {app.job?.title || "Unknown Job"}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {app.job?.company} · {app.job?.location}
                </p>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${
                  statusColors[app.status] || "bg-slate-800 text-slate-400 border-slate-700"
                }`}>
                  {app.status}
                </span>
                <p className="text-slate-600 text-xs">{safeDate(app.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};