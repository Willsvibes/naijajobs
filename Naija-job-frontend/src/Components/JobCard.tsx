

import type { Job } from "../types/job";
import { Link } from "react-router";
import {
  Briefcase,
  PenTool,
  Clock,
  FileText,
  MapPin,
  Heart,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface Props {
  job: Job;
  onEmploymentTypeClick?: (type: string) => void;
  currentFilterType?: string;
}

const JobCard = ({ job, onEmploymentTypeClick, currentFilterType }: Props) => {
  const [favorited, setFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Employment type styles for the badge
  const employmentTypeStyles: Record<
    string,
    { color: string; bgGradient: string; Icon: React.ComponentType<{ size?: number }> }
  > = {
    "Full-time": { 
      color: "text-blue-400", 
      bgGradient: "from-blue-500/20 to-blue-600/20",
      Icon: Briefcase 
    },
    "Freelance": { 
      color: "text-emerald-400", 
      bgGradient: "from-emerald-500/20 to-green-600/20",
      Icon: PenTool 
    },
    "Part-time": { 
      color: "text-amber-400", 
      bgGradient: "from-amber-500/20 to-yellow-600/20",
      Icon: Clock 
    },
    "Contract": { 
      color: "text-purple-400", 
      bgGradient: "from-purple-500/20 to-pink-600/20",
      Icon: FileText 
    },
  };

  const employmentStyle =
    job.employmentType && employmentTypeStyles[job.employmentType]
      ? employmentTypeStyles[job.employmentType]
      : { color: "text-slate-400", bgGradient: "from-slate-500/20 to-slate-600/20", Icon: FileText };

  const isSelected = currentFilterType === job.employmentType;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        group relative p-6 rounded-2xl
        bg-linear-to-br from-slate-900/90 to-slate-800/90 
        backdrop-blur-xl 
        border border-slate-700/50
        transition-all duration-500 ease-out
        hover:border-amber-500/50
        hover:shadow-2xl hover:shadow-amber-500/10
        hover:-translate-y-2
        animate-[slideUp_0.4s_ease]
        flex flex-col gap-5
        overflow-hidden
      "
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 via-transparent to-yellow-500/0 group-hover:from-amber-500/5 group-hover:to-yellow-500/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-linear-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/20 group-hover:via-yellow-500/20 group-hover:to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 "></div>

      <div className="relative">
        {/* Top row: company info + favorite */}
        <div className="flex justify-between items-start mb-4">
          {/* Company logo and name */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600/50 group-hover:border-amber-500/30 transition-colors duration-300">
                <Building2 size={20} className="text-slate-400 group-hover:text-amber-400 transition-colors duration-300" />
              </div>
              {/* Premium badge for high-paying jobs */}
              {Number(job.pay) && Number(job.pay) > 50000 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                  <Sparkles size={10} className="text-black" />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                {job.company}
              </p>
              <p className="text-xs text-slate-500">Posted recently</p>
            </div>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => setFavorited(!favorited)}
            className="p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Heart 
              size={20} 
              className={`transition-all duration-300 ${
                favorited 
                  ? "text-red-400 fill-red-400 scale-110" 
                  : "text-slate-500 group-hover:text-slate-400"
              }`} 
            />
          </button>
        </div>

        {/* Job title */}
        <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-amber-200 group-hover:bg-clip-text transition-all duration-300">
          {job.title}
        </h3>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            onClick={() => onEmploymentTypeClick?.(isSelected ? "" : job.employmentType)}
            className={`
              inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
              cursor-pointer transition-all duration-300
              ${
                isSelected
                  ? "bg-linear-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/25 scale-105"
                  : `bg-linear-to-r ${employmentStyle.bgGradient} ${employmentStyle.color} border border-slate-700/50 hover:border-slate-600 hover:scale-105`
              }
            `}
          >
            <employmentStyle.Icon size={12} /> 
            {job.employmentType}
          </span>

       
          <span className="inline-flex items-center text-xs px-2.5 py-1 bg-slate-800/50 rounded-lg text-slate-400 border border-slate-700/50">
            {job.type}
          </span>
        </div>

        
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
            <MapPin size={14} className="opacity-70" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} className="opacity-70" />
            <span className="text-sm">{job.duration}</span>
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent mb-4"></div>

        
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 3).map((skill: string, i: number) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 bg-slate-800/50 rounded-lg text-slate-300 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs px-2.5 py-1 text-slate-500">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        )}

       
        <div className="flex items-center justify-between pt-2">
          {/* Pay */}
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Salary</p>
            <p className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
              ₦{Number(job.pay).toLocaleString()}
            </p>
          </div>

         
          <Link
            to={`/job/${job.id}`}
            className="
              flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-slate-800/50 border border-slate-700/50
              text-sm font-medium text-slate-300
              hover:bg-linear-to-r hover:from-amber-500 hover:to-yellow-600 
              hover:text-black hover:border-transparent
              hover:shadow-lg hover:shadow-amber-500/25
              transition-all duration-300
              group/btn
            "
          >
            <span>View Details</span>
            <ArrowRight 
              size={16} 
              className={`transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

