
import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import { z } from "zod";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { MAX_IMAGE_UPLOADS, uploadImageToCloudinary } from "../api/cloudinaryUpload";
import { serviceCategories } from "../constants/serviceCategories";

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Client name is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.coerce.number().min(1, "Budget is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
  jobType: z.enum(["Full-time", "Part-time", "Freelance", "Contract"]).optional(),
  skills: z.array(z.string()).optional(),
  workImages: z.array(z.string().min(1)).min(1, "At least one work image is required"),
});

const inputClass =
  "w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600 text-sm";
const labelClass = "block text-sm font-semibold text-slate-400 mb-2";
const errorClass = "text-red-400 text-xs mt-1.5 font-medium";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
    location: "",
    category: "",
    skills: [] as string[],
    workImages: [] as string[],
    jobType: "",
    duration: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploadingWorkImages, setUploadingWorkImages] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const navigate = useNavigate();
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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

  const removeSkill = (skillToRemove: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skillToRemove) });
  };

  const removeWorkImage = (index: number) => {
    setForm({
      ...form,
      workImages: form.workImages.filter((_, imageIndex) => imageIndex !== index),
    });
  };

  const handleWorkImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    if (form.workImages.length + files.length > MAX_IMAGE_UPLOADS) {
      toastError(`You can upload up to ${MAX_IMAGE_UPLOADS} images.`);
      event.target.value = "";
      return;
    }

    try {
      setUploadingWorkImages(true);
      const uploadedUrls = await Promise.all(files.map(uploadImageToCloudinary));
      setForm((prev) => ({
        ...prev,
        workImages: [...prev.workImages, ...uploadedUrls].filter(Boolean),
      }));
      setErrors({ ...errors, workImages: "" });
      toastSuccess("Images uploaded successfully");
    } catch (error: any) {
      toastError(error.message || "Failed to upload images");
    } finally {
      setUploadingWorkImages(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      salary: Number(form.salary),
      workImages: form.workImages.map((image) => image.trim()).filter(Boolean),
    };
    const result = jobSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const formatted = result.error.format();
      Object.keys(formatted).forEach((key) => {
        if (key !== "_errors") {
          fieldErrors[key] = (formatted as any)[key]?._errors?.[0];
        }
      });
      setErrors(fieldErrors);
      toastError("Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);
      toastLoading("Publishing your job listing...");
      await api.post("/jobs", payload);
      toastSuccess("Job posted successfully! 🚀");
      navigate("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to post job.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/80 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden backdrop-blur-xl"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-amber-500 to-orange-500 p-8">
            <h2 className="text-3xl font-black text-black">Post a Service Request</h2>
            <p className="text-black/70 font-medium mt-1 text-sm">
              Show providers what you need done and the budget for it.
            </p>
          </div>

          <div className="p-8 space-y-10">

            {/* Section: Basic Info */}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                  onChange={handleInput}
                  placeholder="Describe the work, current issue, site access, and anything the provider should know..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-slate-800" />

            {/* Section: Logistics & Pay */}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
                    placeholder="e.g. 3 months, Permanent"
                    className={inputClass}
                  />
                  {errors.duration && <p className={errorClass}>{errors.duration}</p>}
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-slate-800" />

            {/* Section: Work Images */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                  Work Images
                </h3>
                <label
                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  {uploadingWorkImages ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                  {uploadingWorkImages ? "Uploading..." : "Upload images"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleWorkImageUpload}
                    disabled={uploadingWorkImages || loading}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-slate-500 text-sm">
                Upload images showing the work area, item, or service problem the employee needs to handle.
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
                      onClick={() => removeWorkImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-slate-950/80 text-slate-200 hover:text-red-300 flex items-center justify-center"
                      aria-label="Remove work image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-slate-800" />

            {/* Section: Skills */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                Required Skills
              </h3>

              <div>
                <label className={labelClass}>Add Skills</label>
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Type a skill and press Enter (e.g. React, Node.js)"
                  className={inputClass}
                />
                <p className="text-slate-600 text-xs mt-1.5">Press Enter to add each skill</p>
              </div>

              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-white transition-colors leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-800 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-4 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl transition shadow-lg shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 text-sm"
              >
                {loading ? "Publishing..." : "Post Request"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
