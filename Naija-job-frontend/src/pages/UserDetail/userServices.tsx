import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router";
import { safeDate } from "../admin/utils";

export interface UserJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  jobType: string;
  createdAt: string;
}

interface UserJobsListProps {
  jobs: UserJob[];
}

export const UserJobsList = ({ jobs }: UserJobsListProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Briefcase size={15} className="text-amber-400" />
        <h2 className="text-white font-semibold text-sm">
          Job Posts{" "}
          <span className="text-slate-500 font-normal">({jobs.length})</span>
        </h2>
      </div>

      {jobs.length === 0 ? (
        <p className="text-slate-600 text-sm">No job posts yet.</p>
      ) : (
        <div className="space-y-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => navigate(`/job/${job._id}`)}
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{job.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {job.company} · {job.location}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-emerald-400 text-xs font-semibold">
                  NGN {job.salary?.toLocaleString?.() || "0"}
                </p>
                <p className="text-slate-600 text-xs">{safeDate(job.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};