// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import api from "../api/axiosInstance";
// import useToastMessage from "../Hooks/useToastMesage";

// const PostJob = () => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     salary: "", // Changed from 'pay' to 'salary' to match backend model
//     location: "",
//     contact: "",
//     category: "", // Changed from 'type' to 'category' to match backend model
//     skills: [] as string[],
//     jobType: "", // Changed from 'employmentType' to 'jobType' to match backend model
//     duration: "",
//     experienceLevel: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [skillInput, setSkillInput] = useState("");

//   const navigate = useNavigate();
//   const { toastSuccess, toastError, toastLoading } = useToastMessage();

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const addSkill = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && skillInput.trim()) {
//       e.preventDefault();
//       if (!form.skills.includes(skillInput.trim())) {
//         setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
//       }
//       setSkillInput("");
//     }
//   };

//   const removeSkill = (skillToRemove: string) => {
//     setForm({ ...form, skills: form.skills.filter(s => s !== skillToRemove) });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!form.title || !form.description || !form.salary || !form.location) {
//       toastError("Please fill in all required fields (*)");
//       return;
//     }

//     try {
//       setLoading(true);
//       toastLoading("Publishing your job listing...");

//       // Convert salary to number
//       const payload = {
//         ...form,
//         salary: Number(form.salary),
//         postedDate: new Date().toISOString()
//       };

//       await api.post("/jobs", payload);

//       toastSuccess("Job posted successfully! 🚀");
//       navigate("/dashboard");
//     } catch (err: any) {
//       console.error("Post job error", err);
//       const message = err.response?.data?.message || "Failed to post job. Please try again.";
//       toastError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <form onSubmit={handleSubmit} className="bg-slate-900/80 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden backdrop-blur-xl">
//           {/* Header */}
//           <div className="bg-linear-to-r from-amber-500 to-yellow-600 p-8">
//             <h2 className="text-3xl font-black text-black">Post a Hustle</h2>
//             <p className="text-black/80 font-medium mt-2">Connecting talent with opportunities</p>
//           </div>

//           <div className="p-8 space-y-8">
//             {/* Basic Info */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-bold text-amber-500 uppercase tracking-wider">Basic Information</h3>
              
//               <div className="grid grid-cols-1 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-400 mb-2">Job Title *</label>
//                   <input
//                     name="title"
//                     value={form.title}
//                     onChange={handleInput}
//                     placeholder="e.g., Senior Frontend Engineer"
//                     required
//                     className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-400 mb-2">Detailed Description *</label>
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleInput}
//                     placeholder="Role responsibilities, requirements, and company culture..."
//                     required
//                     rows={5}
//                     className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600 resize-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Logistics */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-bold text-amber-500 uppercase tracking-wider">Logistics & Pay</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-400 mb-2">Salary (₦) *</label>
//                   <input
//                     name="salary"
//                     type="number"
//                     value={form.salary}
//                     onChange={handleInput}
//                     placeholder="Monthly pay"
//                     required
//                     className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-400 mb-2">Job Category *</label>
//                   <select
//                     name="category"
//                     value={form.category}
//                     onChange={handleInput}
//                     required
//                     className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Tech">Tech</option>
//                     <option value="Design">Design</option>
//                     <option value="Marketing">Marketing</option>
//                     <option value="Sales">Sales</option>
//                     <option value="Writing">Writing</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-400 mb-2">Location *</label>
//                   <input
//                     name="location"
//                     value={form.location}
//                     onChange={handleInput}
//                     placeholder="e.g. Remote, Lagos"
//                     required
//                     className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-400 mb-2">Job Type</label>
//                   <select
//                     name="jobType"
//                     value={form.jobType}
//                     onChange={handleInput}
//                     className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
//                   >
//                     <option value="">Select type</option>
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Contract">Contract</option>
//                     <option value="Freelance">Freelance</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Tags & Skills */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-bold text-amber-500 uppercase tracking-wider">Required Skills</h3>
//               <div>
//                 <input
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyDown={addSkill}
//                   placeholder="Type a skill and press Enter"
//                   className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600"
//                 />
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {form.skills.map((skill, index) => (
//                     <span key={index} className="flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-sm font-medium">
//                       {skill}
//                       <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">×</button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="pt-6 border-t border-slate-800 flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/dashboard")}
//                 className="flex-1 px-6 py-4 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition shadow-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-2 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl transition shadow-lg shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50"
//               >
//                 {loading ? "Publishing..." : "Post Hustle"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;



import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import { z } from "zod";

// ✅ ZOD SCHEMA
const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
 salary: z.coerce.number().min(1, "Salary is required"),
  duration: z.string().min(1, "Duration is required"),

  description: z.string().optional(),
  jobType: z.enum(["Full-time", "Part-time", "Freelance", "Contract"]).optional(),
  skills: z.array(z.string()).optional(),
});

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
    location: "",
    category: "Other",
    skills: [] as string[],
    jobType: "",
    duration: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const navigate = useNavigate();
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error when user types
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
    setForm({ ...form, skills: form.skills.filter(s => s !== skillToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      salary: Number(form.salary),
    };

    const result = jobSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: any = {};
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
      const message =
        err.response?.data?.message || "Failed to post job.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-xl space-y-6">

          {/* Title */}
          <div>
            <input
              name="title"
              value={form.title}
              onChange={handleInput}
              placeholder="Job Title"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Company */}
          <div>
            <input
              name="company"
              value={form.company}
              onChange={handleInput}
              placeholder="Company"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              placeholder="Description"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
          </div>

          {/* Salary */}
          <div>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleInput}
              placeholder="Salary"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
          </div>

          {/* Location */}
          <div>
            <input
              name="location"
              value={form.location}
              onChange={handleInput}
              placeholder="Location"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* Category */}
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleInput}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="Other">Other</option>
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Job Type */}
          <div>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleInput}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <input
              name="duration"
              value={form.duration}
              onChange={handleInput}
              placeholder="Duration (e.g. 3 months)"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>

          {/* Skills */}
          <div>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Add skill and press Enter"
              className="w-full p-3 rounded bg-slate-800 text-white"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills.map((skill, i) => (
                <span key={i} className="bg-amber-500 px-2 py-1 rounded text-black">
                  {skill}
                  <button onClick={() => removeSkill(skill)}> ×</button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 p-3 rounded font-bold"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;