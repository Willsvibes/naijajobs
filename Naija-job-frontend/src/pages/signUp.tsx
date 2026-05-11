import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import { ArrowRight, BriefcaseBusiness, Lock, Mail, User, Wrench } from "lucide-react";

type SignupRole = "employee" | "employer";

const roleOptions: Array<{
  value: SignupRole;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}> = [
  {
    value: "employee",
    title: "Service Provider",
    description: "Find requests and send offers with proof of your previous work.",
    icon: Wrench,
  },
  {
    value: "employer",
    title: "Client",
    description: "Post service requests, review offers, and hire the right provider.",
    icon: BriefcaseBusiness,
  },
];

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee" as SignupRole,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toastError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      toastError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      toastLoading("Creating your account...");

      const res = await api.post("/auth/register", form);

      if (res.status === 201) {
        toastSuccess("Account created. Please sign in.");
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
    <form
      onSubmit={handleSubmit}
      className="w-full text-white flex flex-col gap-6 bg-slate-900/40 p-6 md:p-10 rounded-3xl border border-slate-800/50 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold mb-2 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent text-center">
          Join NaijaJobs
        </h2>
        <p className="text-slate-500 text-sm mb-8 text-center">
          Create a marketplace account as a provider or client.
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
                type="email"
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
                placeholder="At least 6 characters"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-700 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Account Type</label>
            <div className="grid grid-cols-1 gap-3">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                const selected = form.role === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: option.value })}
                    className={`text-left rounded-2xl border p-4 transition-all ${
                      selected
                        ? "border-amber-500/60 bg-amber-500/10"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          selected ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{option.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-amber-500 to-yellow-600 py-4 rounded-2xl mt-8 font-bold text-black hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              Creating account...
            </span>
          ) : (
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-sm text-center mt-8 text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-amber-400 font-bold cursor-pointer hover:text-amber-300 transition-colors"
          >
            Sign in
          </span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
