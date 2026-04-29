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

      const res = await api.post("/auth/login", { email, password });
      
      // Axios stores response data in .data
      const { user, token } = res.data;

      // Update Zustand store (this also persists to localStorage automatically)
      setAuth(user, token);

      toastSuccess("Welcome back! 👋");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error", err);
      const message = err.response?.data?.message || "Login failed. Please check your credentials.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-white flex flex-col gap-4 bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        icon={<Mail size={20} />}
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        icon={<Lock size={20} />}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-amber-500 py-2 rounded mt-2 font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/auth/signup")}
          className="text-amber-400 font-bold cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;