// EmployeeDashboard.tsx
import React, { useState } from "react";
import type { Job } from "../types/job";
import JobCard from "../Components/JobCard";
import { Filter, Briefcase, Clock, PenTool, FileText, Search, Sparkles } from "lucide-react";
import FilterModal, { type FilterValues } from "../Ui/filterModal";

interface Props {
  jobs: Job[];
  onRefresh?: () => void;
}

const EmployeeDashboard: React.FC<Props> = ({ jobs, onRefresh }) => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState<FilterValues>({
    location: "",
    minPay: "",
    jobType: "",
  });

  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("");

  const toggleEmploymentType = (type: string) => {
    setEmploymentTypeFilter((prev) => (prev === type ? "" : type));
  };

  const filteredJobs = jobs.filter((job: Job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchLocation = filters.location
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchMinPay = filters.minPay ? Number(job.pay) >= Number(filters.minPay) : true;

    const matchJobType = filters.jobType
      ? job.type?.toLowerCase() === filters.jobType.toLowerCase()
      : true;

    const matchEmploymentType = employmentTypeFilter
      ? job.employmentType === employmentTypeFilter
      : true;

    return matchSearch && matchLocation && matchMinPay && matchJobType && matchEmploymentType;
  });

  const employmentTypes = [
    { label: "Full-time", icon: <Briefcase size={16} /> },
    { label: "Freelance", icon: <PenTool size={16} /> },
    { label: "Contract", icon: <FileText size={16} /> },
    { label: "Part-time", icon: <Clock size={16} /> },
  ];

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none"></div>
      <div className="relative px-6 max-w-7xl mx-auto z-10">
        {/* HERO SECTION */}
        <div className="pt-12 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">Find nearby service requests</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r h-[100px] from-amber-400 via-yellow-300 to-amber-400 text-transparent bg-clip-text animate-gradient">
            Find Service Work
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Browse requests from clients who need practical work done.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-2 shadow-2xl hover:border-amber-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="h-px md:h-auto md:w-px bg-slate-800"></div>
              <div className="flex items-center gap-3 flex-1 px-4">
                <Search size={18} className="text-slate-500" />
                <input
                  className="bg-transparent outline-none text-white placeholder-slate-500 w-full text-sm"
                  placeholder="Search by service or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-6 py-3 rounded-xl text-sm font-semibold text-black transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* EMPLOYMENT TYPE FILTER CHIPS */}
          <div className="flex flex-wrap gap-3 mt-6">
            {employmentTypes.map((item) => (
              <button
                key={item.label}
                onClick={() => toggleEmploymentType(item.label)}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                  employmentTypeFilter === item.label
                    ? "bg-linear-to-r from-amber-500 to-yellow-600 text-black border-transparent shadow-lg shadow-amber-500/25 scale-105"
                    : "bg-slate-900/50 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/50 hover:scale-105"
                }`}
              >
                <span className={employmentTypeFilter === item.label ? "text-black" : "text-amber-400 group-hover:text-amber-300"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Active Filters Indicator */}
          {(employmentTypeFilter || filters.jobType || filters.location || filters.minPay) && (
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="text-xs text-slate-500 font-medium">Active filters:</span>
              {employmentTypeFilter && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-400">
                  {employmentTypeFilter}
                  <button onClick={() => setEmploymentTypeFilter("")} className="hover:text-amber-300">×</button>
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400">
                  📍 {filters.location}
                  <button onClick={() => setFilters(prev => ({ ...prev, location: "" }))} className="hover:text-blue-300">×</button>
                </span>
              )}
              {filters.minPay && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400">
                  ₦{Number(filters.minPay).toLocaleString()}+
                  <button onClick={() => setFilters(prev => ({ ...prev, minPay: "" }))} className="hover:text-emerald-300">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setEmploymentTypeFilter("");
                  setFilters({ location: "", minPay: "", jobType: "" });
                }}
                className="text-xs text-slate-500 hover:text-amber-400 underline transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* RESULTS COUNT */}
        {filteredJobs.length > 0 && (
          <div className="mb-6">
            <p className="text-slate-400 text-sm">
              Showing <span className="text-amber-400 font-semibold">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
            </p>
          </div>
        )}

        {/* JOB RESULTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                currentFilterType={employmentTypeFilter}
                onEmploymentTypeClick={toggleEmploymentType}
                onDelete={onRefresh}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                <Search size={24} className="text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg mb-2">No opportunities found</p>
              <p className="text-slate-600 text-sm">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        {/* FILTER MODAL */}
        <FilterModal
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={(data) => setFilters(data)}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
