import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";

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
    <div className="max-w-md text-white flex flex-col gap-4 bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors"
        />
      </div>

      {/* <FormInput
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={form.name}
        onChange={handleChange}
      /> */}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400">Email Address</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400">Identify as</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors appearance-none"
        >
          <option value="employee">Employee (Searching for jobs)</option>
          <option value="employer">Employer (Posting jobs)</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-amber-500 py-3 rounded-lg mt-4 font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      <p className="text-sm text-center mt-2 text-slate-400">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/auth/login")}
          className="text-amber-400 font-bold cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;