
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type{ Job } from "../types/job";
import {
  ArrowLeft,
  MapPin,
  BadgeDollarSign,
  Briefcase,
  Clock,
  Calendar,
  Building2,
  Sparkles,
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job| null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(!id) return;
  
    const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
      const data = await res.json();

      setJob({
        id: data._id,
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        duration: data.duration,
        skills: data.skills,
        pay: data.salary,
        type: data.category,
        employmentType: data.jobType
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  fetchJob();
}, [id]);


if (loading){
  return <p className="text-white text-center text-3xl mt-20">
    Loading job...
  </p>
}
  if (!job) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-4">
            <Briefcase size={32} className="text-slate-600" />
          </div>
          <p className="text-slate-400 text-xl mb-6">Job not found</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-6 py-3 rounded-xl text-sm font-semibold text-black transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
   
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background accent */}
      <div className="fixed inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Jobs</span>
        </Link>

        {/* Job Header Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-xs text-amber-400 font-medium">Featured Opportunity</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-3 bg-linear-to-r from-amber-400 via-yellow-300 to-amber-400  bg-clip-text">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-300 mb-4">
                <Building2 size={18} className="text-amber-400" />
                <span className="text-lg font-medium">{job.company}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={18} className="text-slate-500" />
                <span>{job.location}</span>
              </div>
            </div>

            {/* Employment Type Badge */}
            <div className="bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 text-sm px-4 py-2 rounded-full font-semibold">
              {job.employmentType || job.type}
            </div>
          </div>
        </div>

        {/* Job Info Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-5 hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <BadgeDollarSign size={20} className="text-emerald-400" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Salary</p>
            <p className="text-xl font-bold text-white">₦{Number(job.pay).toLocaleString()}</p>
            <p className="text-xs text-slate-600 mt-1">per month</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-5 hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Briefcase size={20} className="text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Job Type</p>
            <p className="text-xl font-bold text-white">{job.type}</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-5 hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock size={20} className="text-amber-400" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Posted</p>
            <p className="text-xl font-bold text-white">2 days ago</p>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-linear-to-b from-amber-500 to-yellow-600 rounded-full"></span>
            Job Description
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {job.description}
          </p>

          {/* Additional Details */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-4">Key Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-amber-400 mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Start Date</p>
                  <p className="text-white font-medium">Immediate</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 size={18} className="text-amber-400 mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Company</p>
                  <p className="text-white font-medium">{job.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Work Location</p>
                  <p className="text-white font-medium">{job.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-lg group">
          <span onClick={()=>navigate("/job/apply")} className="flex items-center justify-center gap-2">
            Apply Now
            <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
          </span>
         
        </button>

        {/* Footer Note */}
        <p className="text-center text-slate-600 text-sm mt-6">
          By applying, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default JobDetails;