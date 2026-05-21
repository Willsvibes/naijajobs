import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import {
  Building2,
  Check,
  Code,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Save,
  User,
  X,
} from "lucide-react";
import type { ProfileData, ProfileFormState } from "./types";

interface ProfileFormProps {
  profileData: ProfileData;
  form: ProfileFormState;
  skillInput: string;
  saving: boolean;
  saved: boolean;
  onFormChange: (form: ProfileFormState) => void;
  onSkillInputChange: (value: string) => void;
  onSubmit: () => void;
}

export const ProfileForm = ({
  profileData,
  form,
  skillInput,
  saving,
  saved,
  onFormChange,
  onSkillInputChange,
  onSubmit,
}: ProfileFormProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFormChange({ ...form, [event.target.name]: event.target.value });
  };

  const addSkill = (event: KeyboardEvent) => {
    if (event.key === "Enter" && skillInput.trim()) {
      event.preventDefault();
      const nextSkill = skillInput.trim();
      if (!form.skills.includes(nextSkill)) {
        onFormChange({ ...form, skills: [...form.skills, nextSkill] });
      }
      onSkillInputChange("");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
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
        <TextField
          label="Full Name"
          icon={<User size={12} className="text-amber-500" />}
          name="name"
          value={form.name}
          placeholder="Your full name"
          onChange={handleChange}
        />
        <ReadOnlyEmail email={profileData.email} />
        <BioField value={form.bio} onChange={handleChange} />

        {profileData.role === "employee" && (
          <SkillsField
            skills={form.skills}
            skillInput={skillInput}
            onSkillInputChange={onSkillInputChange}
            onAddSkill={addSkill}
            onRemoveSkill={(skill) =>
              onFormChange({ ...form, skills: form.skills.filter((item) => item !== skill) })
            }
          />
        )}

        {profileData.role === "employer" && (
          <TextField
            label="Company Name"
            icon={<Building2 size={12} className="text-amber-500" />}
            name="companyName"
            value={form.companyName}
            placeholder="Your company name"
            onChange={handleChange}
          />
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={saving}
          className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-xl ${
            saved
              ? "bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/25"
          }`}
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Saving changes...
            </>
          ) : saved ? (
            <>
              <Check size={18} /> Changes saved!
            </>
          ) : (
            <>
              <Save size={18} /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

interface TextFieldProps {
  label: string;
  icon: ReactNode;
  name: keyof ProfileFormState;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ label, icon, name, value, placeholder, onChange }: TextFieldProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
      {icon} {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 hover:border-slate-600"
      placeholder={placeholder}
    />
  </div>
);

const ReadOnlyEmail = ({ email }: { email: string }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
      <Mail size={12} className="text-slate-500" /> Email Address
      <span className="text-slate-600 font-normal normal-case tracking-normal text-xs">
        read only
      </span>
    </label>
    <input
      value={email}
      readOnly
      className="w-full bg-slate-800/20 border border-slate-800 text-slate-600 rounded-2xl px-4 py-3.5 text-sm cursor-not-allowed"
    />
  </div>
);

const BioField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
      <MapPin size={12} className="text-amber-500" /> Bio
    </label>
    <textarea
      name="bio"
      value={value}
      onChange={onChange}
      rows={4}
      placeholder="Tell employers a bit about yourself, your experience, and what you're looking for..."
      className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 resize-none hover:border-slate-600 leading-relaxed"
    />
  </div>
);

interface SkillsFieldProps {
  skills: string[];
  skillInput: string;
  onSkillInputChange: (value: string) => void;
  onAddSkill: (event: KeyboardEvent) => void;
  onRemoveSkill: (skill: string) => void;
}

const SkillsField = ({
  skills,
  skillInput,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
}: SkillsFieldProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
      <Code size={12} className="text-amber-500" /> Skills
    </label>
    <input
      value={skillInput}
      onChange={(event) => onSkillInputChange(event.target.value)}
      onKeyDown={onAddSkill}
      placeholder="Type a skill and press Enter (e.g. React, Node.js)"
      className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all placeholder-slate-600 hover:border-slate-600"
    />

    {skills.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-1">
        {skills.map((skill) => (
          <span
            key={skill}
            className="group flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/25 px-3 py-1.5 rounded-xl text-xs font-semibold hover:border-amber-500/50 transition-colors"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemoveSkill(skill)}
              className="text-amber-500/50 hover:text-white transition-colors ml-0.5"
            >
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
    )}
  </div>
);
