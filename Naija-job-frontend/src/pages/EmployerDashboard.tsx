import { useState } from "react";
import type { Job } from "../types/job";
import JobCard from "../Components/JobCard";
import { useNavigate } from "react-router";
import {
  Plus, Briefcase, Users, BarChart3, Search,
  TrendingUp, Clock, X, Loader2, ChevronRight,
  CheckCircle, XCircle, Eye, UserCircle2,
} from "lucide-react";
import api from "../api/axiosInstance";
import { toast } from "sonner";

interface Application {
  _id: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  coverLetter: string;
  createdAt: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
    skills?: string[];
    bio?: string;
  };
}

interface Props {
  jobs: Job[];
  onRefresh?: () => void;
}

const StatCard = ({ label, value, icon: Icon, trend, color }: any) => (
  <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2.5 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 group-hover:border-amber-500/30 transition-colors">
        <Icon size={20} className={color === "amber" ? "text-amber-400" : "text-slate-400 group-hover:text-amber-400 transition-colors"} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
          <TrendingUp size={10} />{trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">{label}</h3>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

const statusConfig: Record<Application["status"], { label: string; color: string; bg: string }> = {
  pending:  { label: "Pending",  color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/20"     },
  reviewed: { label: "Reviewed", color: "text-blue-400",    bg: "bg-blue-500/10 border-blue-500/20"       },
  accepted: { label: "Accepted", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  rejected: { label: "Rejected", color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20"         },
};

const EmployerDashboard: React.FC<Props> = ({ jobs, onRefresh }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMonthlyPay = jobs.reduce((sum, job) => sum + Number(job.pay), 0);
  const fullTimeCount = jobs.filter((j) => j.employmentType === "Full-time").length;

  const fetchApplications = async (jobId: string | number) => {
    try {
      setLoadingApps(true);
      const res = await api.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoadingApps(false);
    }
  };

  const handleViewApplications = (job: Job) => {
    setSelectedJob(job);
    fetchApplications(job.id);
  };

  const updateStatus = async (applicationId: string, status: Application["status"]) => {
    try {
      setUpdatingId(applicationId);
      await api.patch(`/applications/${applicationId}/status`, { status });
      setApplications((prev) =>
        prev.map((a) => (a._id === applicationId ? { ...a, status } : a))
      );
      toast.success(`Application ${status}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 pb-20">
      <div className="fixed inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2">
              Employer Dashboard
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Monitor listings, track candidates, and manage your pipeline.
            </p>
          </div>
          <button
            onClick={() => navigate("/post")}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-5 py-3 sm:px-8 sm:py-4 rounded-2xl text-sm sm:text-base font-bold text-black transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
          >
            <Plus size={18} strokeWidth={2.5} />
            Post New Job
          </button>
        </div>

        {/* ── Stats Grid ─────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <StatCard label="Total Postings" value={jobs.length} icon={Briefcase} trend="+2 this week" />
          <StatCard label="Active Listings" value={jobs.length} icon={BarChart3} color="amber" />
          <StatCard label="Full-time Roles" value={fullTimeCount} icon={Clock} />
          <StatCard
            label="Total Budget"
            value={`₦${(totalMonthlyPay / 1000).toFixed(0)}k`}
            icon={Users}
            color="amber"
          />
        </div>

        {/* ── Search + Title ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            Your Listings
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {filteredJobs.length} active
            </span>
          </h2>

          <div className="relative group w-full sm:min-w-[320px] sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-500 group-focus-within:text-amber-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-all duration-300 text-sm"
            />
          </div>
        </div>

        {/* ── Job Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-2">
                <JobCard job={job} onDelete={onRefresh} />
                <button
                  onClick={() => handleViewApplications(job)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-all text-sm font-medium"
                >
                  <Eye size={14} />
                  View Applications
                  <ChevronRight size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900/50 flex items-center justify-center mb-5 text-slate-700 border border-slate-800">
                <Briefcase size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No listings found</h3>
              <p className="text-slate-500 max-w-sm text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "You haven't posted any jobs yet."}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate("/post")}
                  className="mt-6 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm group"
                >
                  <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                  Post your first job
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Applications Drawer ─────────────────────── */}
      {selectedJob && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSelectedJob(null)}
          />
          {/* Full screen on mobile, side drawer on desktop */}
          <div className="fixed inset-0 sm:inset-auto sm:right-0 sm:top-0 sm:h-full sm:w-[480px] bg-slate-900 border-t sm:border-t-0 sm:border-l border-slate-800 z-50 flex flex-col shadow-2xl rounded-t-3xl sm:rounded-none">

            {/* Drawer Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-800">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{selectedJob.title}</h2>
                <p className="text-slate-400 text-sm mt-0.5">{selectedJob.company}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Applications List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {loadingApps ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={28} className="text-amber-500 animate-spin" />
                </div>
              ) : applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <UserCircle2 size={48} className="text-slate-700 mb-4" />
                  <p className="text-slate-500 text-sm">No applications yet for this job</p>
                </div>
              ) : (
                applications.map((app) => {
                  const config = statusConfig[app.status];
                  return (
                    <div
                      key={app._id}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 sm:p-5 space-y-4"
                    >
                      {/* Applicant info */}
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

                      {/* Skills */}
                      {app.applicant.skills && app.applicant.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {app.applicant.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded-md border border-slate-600/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Cover letter */}
                      {app.coverLetter && (
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                          {app.coverLetter}
                        </p>
                      )}

                      {/* Actions */}
                      {app.status !== "accepted" && app.status !== "rejected" ? (
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => updateStatus(app._id, "accepted")}
                            disabled={updatingId === app._id}
                            className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-medium disabled:opacity-50"
                          >
                            {updatingId === app._id
                              ? <Loader2 size={12} className="animate-spin" />
                              : <CheckCircle size={12} />}
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(app._id, "reviewed")}
                            disabled={updatingId === app._id}
                            className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-medium disabled:opacity-50"
                          >
                            <Eye size={12} />
                            Review
                          </button>
                          <button
                            onClick={() => updateStatus(app._id, "rejected")}
                            disabled={updatingId === app._id}
                            className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium disabled:opacity-50"
                          >
                            <XCircle size={12} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateStatus(app._id, "pending")}
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
      )}
    </div>
  );
};

export default EmployerDashboard;