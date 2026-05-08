import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import {
  User, Briefcase, Mail, Code,
  Building2, Save, Loader2, X, Check,
  Pencil, MapPin,
} from "lucide-react";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [skillInput, setSkillInput] = useState("");
  const [form, setForm] = useState({
    name: "",
    skills: [] as string[],
    companyName: "",
    bio: "",
  });

  const { toastSuccess, toastError } = useToastMessage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        const data = res.data;
        setProfileData(data);
        setForm({
          name: data.name || "",
          skills: data.skills || [],
          companyName: data.companyName || "",
          bio: data.bio || "",
        });
      } catch {
        toastError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!form.skills.includes(skillInput.trim())) {
        setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const res = await api.put("/profile", form);
      setProfileData(res.data);
      if (res.data.name !== user?.name) {
        updateUser({ name: res.data.name });
      }
      setSaved(true);
      toastSuccess("Profile updated!");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toastError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-amber-500 animate-spin" />
        </div>
      </div>
    );
  }

  const initials = profileData?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── Hero Card ────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
          {/* Ambient glow background */}
          <div className="absolute inset-0 bg-linear-to-br from-amber-500/8 via-transparent to-orange-500/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative self-start sm:self-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 text-3xl font-black text-black">
                  {initials}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-lg" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {profileData?.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 capitalize">
                        <Briefcase size={11} />
                        {profileData?.role}
                      </span>
                      {profileData?.companyName && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          <Building2 size={11} />
                          {profileData.companyName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-3">
                  <Mail size={13} className="text-slate-500" />
                  <span className="text-slate-400 text-sm">{profileData?.email}</span>
                </div>

                {profileData?.bio && (
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed line-clamp-2">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Skills preview */}
            {profileData?.role === "employee" && profileData?.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-800/60">
                {profileData.skills.slice(0, 6).map((skill: string, i: number) => (
                  <span
                    key={i}
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
            )}
          </div>
        </div>

        {/* ── Edit Form ────────────────────────────── */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
          {/* Form header */}
          <div className="flex items-center gap-3 px-6 sm:px-8 py-5 border-b border-slate-800/60">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Pencil size={15} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Edit Profile</h2>
              <p className="text-slate-500 text-xs">Update your personal details</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <User size={12} className="text-amber-500" /> Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 hover:border-slate-600"
                placeholder="Your full name"
              />
            </div>

            {/* Email read-only */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Mail size={12} className="text-slate-500" /> Email Address
                <span className="text-slate-600 font-normal normal-case tracking-normal text-xs">· read only</span>
              </label>
              <div className="relative">
                <input
                  value={profileData?.email || ""}
                  readOnly
                  className="w-full bg-slate-800/20 border border-slate-800 text-slate-600 rounded-2xl px-4 py-3.5 text-sm cursor-not-allowed"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <MapPin size={12} className="text-amber-500" /> Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell employers a bit about yourself, your experience, and what you're looking for..."
                className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 resize-none hover:border-slate-600 leading-relaxed"
              />
            </div>

            {/* Skills — employee only */}
            {profileData?.role === "employee" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Code size={12} className="text-amber-500" /> Skills
                </label>
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Type a skill and press Enter (e.g. React, Node.js)"
                  className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 hover:border-slate-600"
                />

                {form.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {form.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="group flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/25 px-3 py-1.5 rounded-xl text-xs font-semibold hover:border-amber-500/50 transition-colors"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-amber-500/50 hover:text-white transition-colors ml-0.5"
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Company — employer only */}
            {profileData?.role === "employer" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Building2 size={12} className="text-amber-500" /> Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 hover:border-slate-600"
                />
              </div>
            )}

            {/* Save button */}
            <div className="pt-2">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-xl ${
                  saved
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/25"
                }`}
              >
                {saving ? (
                  <><Loader2 size={18} className="animate-spin" /> Saving changes...</>
                ) : saved ? (
                  <><Check size={18} /> Changes saved!</>
                ) : (
                  <><Save size={18} /> Save Changes</>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;