import type React from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { MAX_IMAGE_UPLOADS } from "../../api/cloudinaryUpload";
import { serviceCategories } from "../../constants/serviceCategories";

export interface PostJobFormState {
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
  category: string;
  skills: string[];
  workImages: string[];
  jobType: string;
  duration: string;
}

interface CommonSectionProps {
  form: PostJobFormState;
  errors: Record<string, string>;
  inputClass: string;
  labelClass: string;
  errorClass: string;
}

interface BasicInfoSectionProps extends CommonSectionProps {
  onInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const BasicInfoSection = ({
  form,
  errors,
  inputClass,
  labelClass,
  errorClass,
  onInput,
}: BasicInfoSectionProps) => (
  <section className="space-y-5">
    <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
      Basic Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className={labelClass}>Service Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={onInput}
          placeholder="e.g. Fix leaking kitchen sink"
          className={inputClass}
        />
        {errors.title && <p className={errorClass}>{errors.title}</p>}
      </div>

      <div>
        <label className={labelClass}>Client / Business Name *</label>
        <input
          name="company"
          value={form.company}
          onChange={onInput}
          placeholder="e.g. Ada Homes"
          className={inputClass}
        />
        {errors.company && <p className={errorClass}>{errors.company}</p>}
      </div>
    </div>

    <div>
      <label className={labelClass}>Request Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={onInput}
        placeholder="Describe the work, current issue, site access, and anything the provider should know..."
        rows={5}
        className={`${inputClass} resize-none`}
      />
    </div>
  </section>
);

export const LogisticsSection = ({
  form,
  errors,
  inputClass,
  labelClass,
  errorClass,
  onInput,
}: BasicInfoSectionProps) => (
  <section className="space-y-5">
    <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
      Logistics & Pay
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className={labelClass}>Budget (NGN) *</label>
        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={onInput}
          placeholder="Your budget"
          className={inputClass}
        />
        {errors.salary && <p className={errorClass}>{errors.salary}</p>}
      </div>

      <div>
        <label className={labelClass}>Location *</label>
        <input
          name="location"
          value={form.location}
          onChange={onInput}
          placeholder="e.g. Remote, Lagos"
          className={inputClass}
        />
        {errors.location && <p className={errorClass}>{errors.location}</p>}
      </div>

      <div>
        <label className={labelClass}>Service Category *</label>
        <select
          name="category"
          value={form.category}
          onChange={onInput}
          className={inputClass}
        >
          <option value="">Select category</option>
          {serviceCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className={errorClass}>{errors.category}</p>}
      </div>

      <div>
        <label className={labelClass}>Engagement Type</label>
        <select
          name="jobType"
          value={form.jobType}
          onChange={onInput}
          className={inputClass}
        >
          <option value="">Select type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Freelance">Freelance</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>Expected Duration *</label>
        <input
          name="duration"
          value={form.duration}
          onChange={onInput}
          placeholder="e.g. 3 months, Permanent"
          className={inputClass}
        />
        {errors.duration && <p className={errorClass}>{errors.duration}</p>}
      </div>
    </div>
  </section>
);

interface WorkImagesSectionProps extends CommonSectionProps {
  loading: boolean;
  uploadingWorkImages: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

export const WorkImagesSection = ({
  form,
  errors,
  errorClass,
  loading,
  uploadingWorkImages,
  onUpload,
  onRemove,
}: WorkImagesSectionProps) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
        Work Images
      </h3>
      <label className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 cursor-pointer">
        {uploadingWorkImages ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
        {uploadingWorkImages ? "Uploading..." : "Upload images"}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          disabled={uploadingWorkImages || loading}
          className="hidden"
        />
      </label>
    </div>

    <p className="text-slate-500 text-sm">
      Upload images showing the work area, item, or service problem the provider needs to handle.
    </p>
    <p className="text-slate-600 text-xs">
      Up to {MAX_IMAGE_UPLOADS} images. Each image must be 5MB or less.
    </p>

    {errors.workImages && <p className={errorClass}>{errors.workImages}</p>}

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {form.workImages.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
        >
          <img
            src={image}
            alt={`Work needed ${index + 1}`}
            className="h-28 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-slate-950/80 text-slate-200 hover:text-red-300 flex items-center justify-center"
            aria-label="Remove work image"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  </section>
);

interface SkillsSectionProps extends CommonSectionProps {
  skillInput: string;
  onSkillInputChange: (value: string) => void;
  onAddSkill: (event: React.KeyboardEvent) => void;
  onRemoveSkill: (skill: string) => void;
}

export const SkillsSection = ({
  form,
  inputClass,
  labelClass,
  skillInput,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
}: SkillsSectionProps) => (
  <section className="space-y-4">
    <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
      Required Skills
    </h3>

    <div>
      <label className={labelClass}>Add Skills</label>
      <input
        value={skillInput}
        onChange={(event) => onSkillInputChange(event.target.value)}
        onKeyDown={onAddSkill}
        placeholder="Type a skill and press Enter (e.g. plumbing, painting)"
        className={inputClass}
      />
      <p className="text-slate-600 text-xs mt-1.5">Press Enter to add each skill</p>
    </div>

    {form.skills.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-1">
        {form.skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemoveSkill(skill)}
              className="hover:text-white transition-colors leading-none"
            >
              x
            </button>
          </span>
        ))}
      </div>
    )}
  </section>
);
