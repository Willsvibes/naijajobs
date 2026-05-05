import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import { User, Mail, Lock, Briefcase } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", 
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toastError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      toastLoading("Creating your account...");

      const res = await api.post("/auth/register", form);

      if (res.status === 201) {
        toastSuccess("Registration successful! Please login.");
        navigate("/auth/login");
      }
    } catch (err: any) {
      console.error("Signup error", err);
      const message = err.response?.data?.message || "Signup failed. Please try again.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white flex flex-col gap-6 bg-slate-900/40 p-6 md:p-10 rounded-3xl border border-slate-800/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold mb-2 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent text-center">
          Join NaijaJobs
        </h2>
        <p className="text-slate-500 text-sm mb-8 text-center">
          Create an account to start your journey
        </p>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-slate-600 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-700 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-600 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-700 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-600 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-700 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Account Type</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Briefcase size={18} className="text-slate-600 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-10 text-white focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="employee">Employee (Searching for jobs)</option>
                <option value="employer">Employer (Posting jobs)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-linear-to-r from-amber-500 to-yellow-600 py-4 rounded-2xl mt-8 font-bold text-black hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-sm text-center mt-8 text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-amber-400 font-bold cursor-pointer hover:text-amber-300 transition-colors"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;