import { Briefcase, ChevronRight, Eye, Plus, Search } from "lucide-react";
import JobCard from "../../Components/JobCard";
import type { Job } from "../../types/job";

interface RequestGridProps {
  jobs: Job[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onViewOffers: (job: Job) => void;
  onPostRequest: () => void;
  onRefresh?: () => void;
}

export const RequestGrid = ({
  jobs,
  searchQuery,
  onSearchChange,
  onViewOffers,
  onPostRequest,
  onRefresh,
}: RequestGridProps) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
        Your Requests
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
          {jobs.length} active
        </span>
      </h2>

      <div className="relative group w-full sm:min-w-[320px] sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={16} className="text-slate-500 group-focus-within:text-amber-400 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-all duration-300 text-sm"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="flex flex-col gap-2">
            <JobCard job={job} onDelete={onRefresh} />
            <button
              onClick={() => onViewOffers(job)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-all text-sm font-medium"
            >
              <Eye size={14} />
              View Offers
              <ChevronRight size={14} />
            </button>
          </div>
        ))
      ) : (
        <div className="col-span-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900/50 flex items-center justify-center mb-5 text-slate-700 border border-slate-800">
            <Briefcase size={28} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No requests found</h3>
          <p className="text-slate-500 max-w-sm text-sm">
            {searchQuery ? `No results for "${searchQuery}"` : "You haven't posted any service requests yet."}
          </p>
          {!searchQuery && (
            <button
              onClick={onPostRequest}
              className="mt-6 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform" />
              Post your first request
            </button>
          )}
        </div>
      )}
    </div>
  </>
);
