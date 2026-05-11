import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState, useCallback } from "react";
import type { Job } from "../types/job";
import api from "../api/axiosInstance";
import {
  ArrowLeft,
  MapPin,
  BadgeDollarSign,
  Briefcase,
  Clock,
  Building2,
  Sparkles,
} from "lucide-react";
import { PageLoader } from "../Ui/pageLoader";

interface ApiJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  skills: string[];
  salary: number;
  jobType: string;
  category: string;
  description?: string;
  workImages?: string[];
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<ApiJob>(`/jobs/${id}`);
      const data = res.data;

      setJob({
        id: data._id,
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description ?? "",
        duration: data.duration,
        skills: data.skills,
        pay: data.salary,
        type: data.category,
        employmentType: data.jobType,
        workImages: data.workImages ?? [],
      });
    } catch (err: any) {
      console.error("Error fetching job details", err);
      setError("Failed to load job details. It may have been removed or is unavailable.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  if (loading) {
    return <PageLoader label="Loading request details" />;
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-4 text-slate-600">
            <Briefcase size={32} />
          </div>
          <p className="text-slate-400 text-xl mb-6">{error || "Job not found"}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 px-6 py-3 rounded-xl text-sm font-semibold text-black transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 pb-20">
      <div className="fixed inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Jobs</span>
        </Link>

        {/* Job Header Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-xs text-amber-400 font-medium uppercase tracking-wider">Top Match</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-slate-300">
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                  <Building2 size={18} className="text-amber-400" />
                  <span className="font-semibold">{job.company}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                  <MapPin size={18} className="text-slate-400" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500 text-black text-sm px-6 py-2 rounded-xl font-bold self-start shadow-lg shadow-amber-500/20">
              {job.employmentType || job.type}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 group hover:border-amber-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BadgeDollarSign size={24} className="text-emerald-400" />
            </div>
            <p className="text-sm text-slate-500 font-medium uppercase">Budget</p>
            <p className="text-2xl font-bold text-white mt-1">₦{Number(job.pay).toLocaleString()}</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 group hover:border-blue-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase size={24} className="text-blue-400" />
            </div>
            <p className="text-sm text-slate-500 font-medium uppercase">Job Category</p>
            <p className="text-2xl font-bold text-white mt-1">{job.type}</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 group hover:border-amber-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} className="text-amber-400" />
            </div>
            <p className="text-sm text-slate-500 font-medium uppercase">Job Duration</p>
            <p className="text-2xl font-bold text-white mt-1">{job.duration || "Permanent"}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-amber-500 rounded-full"></span>
            About the Role
          </h2>
          <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
            {job.description}
          </div>

          {job.workImages && job.workImages.length > 0 && (
            <div className="mt-10 pt-10 border-t border-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-6">Work Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.workImages.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`Work needed ${index + 1}`}
                    className="h-56 w-full object-cover rounded-2xl border border-slate-700 bg-slate-800"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 pt-10 border-t border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-6">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills?.length > 0 ? job.skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium border border-slate-700">
                  {skill}
                </span>
              )) : <p className="text-slate-500 italic">No specific skills listed.</p>}
            </div>
          </div>
        </div>

        {/* Application Action */}
        <div className="sticky bottom-6">
          <button 
            onClick={() => navigate(`/job/apply/${id}`)}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-5 rounded-2xl shadow-2xl shadow-amber-500/20 transition-all duration-300 text-xl flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            Apply for this position
            <ArrowLeft size={24} className="rotate-180" />
          </button>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Apply responsibly. Good luck with your application!
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
