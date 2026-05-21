import { Briefcase, Building2, Mail } from "lucide-react";
import type { ProfileData } from "./types";

export const ProfileHero = ({ profileData }: { profileData: ProfileData }) => {
  const initials =
    profileData.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/8 via-transparent to-orange-500/5 pointer-events-none" />
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative self-start sm:self-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 text-3xl font-black text-black">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-lg" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {profileData.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 capitalize">
                <Briefcase size={11} />
                {profileData.role}
              </span>
              {profileData.companyName && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  <Building2 size={11} />
                  {profileData.companyName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Mail size={13} className="text-slate-500" />
              <span className="text-slate-400 text-sm">{profileData.email}</span>
            </div>
            {profileData.bio && (
              <p className="text-slate-400 text-sm mt-3 leading-relaxed line-clamp-2">
                {profileData.bio}
              </p>
            )}
          </div>
        </div>

        {profileData.role === "employee" && profileData.skills?.length ? (
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-800/60">
            {profileData.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2.5 py-1 bg-slate-800/60 text-slate-300 rounded-lg border border-slate-700/50"
              >
                {skill}
              </span>
            ))}
            {profileData.skills.length > 6 && (
              <span className="text-xs px-2.5 py-1 text-slate-500">
                +{profileData.skills.length - 6} more
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
