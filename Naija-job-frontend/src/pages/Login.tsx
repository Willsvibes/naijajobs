
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import useToastMessage from "../Hooks/useToastMesage";
import FormInput from "../Ui/formInput";
import { Mail, Lock } from "lucide-react";
import api from "../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleLogin = async () => {
    if (!email || !password) {
      toastError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      toastLoading("Authenticating...");

      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true } 
      );

 
      const { user, accessToken } = res.data;

      setAuth(user, accessToken);

      toastSuccess("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error", err);
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white flex flex-col gap-6 bg-slate-900/40 p-6 md:p-10 rounded-3xl border border-slate-800/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold mb-2 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Enter your credentials to access your account
        </p>

        <div className="space-y-4">
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={setEmail}
            icon={<Mail size={18} className="text-slate-500" />}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            icon={<Lock size={18} className="text-slate-500" />}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-linear-to-r from-amber-500 to-yellow-600 py-4 rounded-2xl mt-8 font-bold text-black hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-sm text-center mt-8 text-slate-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/auth/signup")}
            className="text-amber-400 font-bold cursor-pointer hover:text-amber-300 transition-colors"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

