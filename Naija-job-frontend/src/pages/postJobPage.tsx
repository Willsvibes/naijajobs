import React, { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import api from "../api/axiosInstance";
import { MAX_IMAGE_UPLOADS, uploadImageToCloudinary } from "../api/cloudinaryUpload";
import useToastMessage from "../Hooks/useToastMesage";
import {
  BasicInfoSection,
  LogisticsSection,
  SkillsSection,
  WorkImagesSection,
  type PostJobFormState,
} from "./postJob/PostJobSections";

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

const initialForm: PostJobFormState = {
  title: "",
  company: "",
  description: "",
  salary: "",
  location: "",
  category: "",
  skills: [],
  workImages: [],
  jobType: "",
  duration: "",
};

const PostJob = () => {
  const [form, setForm] = useState<PostJobFormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploadingWorkImages, setUploadingWorkImages] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const navigate = useNavigate();
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const addSkill = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && skillInput.trim()) {
      event.preventDefault();
      const nextSkill = skillInput.trim();

      if (!form.skills.includes(nextSkill)) {
        setForm({ ...form, skills: [...form.skills, nextSkill] });
      }

      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setForm({ ...form, skills: form.skills.filter((skill) => skill !== skillToRemove) });
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      toastLoading("Publishing your service request...");
      await api.post("/jobs", payload);
      toastSuccess("Request posted successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to post request.";
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
          <div className="bg-linear-to-r from-amber-500 to-orange-500 p-8">
            <h2 className="text-3xl font-black text-black">Post a Service Request</h2>
            <p className="text-black/70 font-medium mt-1 text-sm">
              Show providers what you need done and the budget for it.
            </p>
          </div>

          <div className="p-8 space-y-10">
            <BasicInfoSection
              form={form}
              errors={errors}
              inputClass={inputClass}
              labelClass={labelClass}
              errorClass={errorClass}
              onInput={handleInput}
            />

            <div className="border-t border-slate-800" />

            <LogisticsSection
              form={form}
              errors={errors}
              inputClass={inputClass}
              labelClass={labelClass}
              errorClass={errorClass}
              onInput={handleInput}
            />

            <div className="border-t border-slate-800" />

            <WorkImagesSection
              form={form}
              errors={errors}
              inputClass={inputClass}
              labelClass={labelClass}
              errorClass={errorClass}
              loading={loading}
              uploadingWorkImages={uploadingWorkImages}
              onUpload={handleWorkImageUpload}
              onRemove={removeWorkImage}
            />

            <div className="border-t border-slate-800" />

            <SkillsSection
              form={form}
              errors={errors}
              inputClass={inputClass}
              labelClass={labelClass}
              errorClass={errorClass}
              skillInput={skillInput}
              onSkillInputChange={setSkillInput}
              onAddSkill={addSkill}
              onRemoveSkill={removeSkill}
            />

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
