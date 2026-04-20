import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Hooks/authContext";
import useToastMessage from "../Hooks/useToastMesage";
import FormInput from "../Ui/formInput";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { toastSuccess, toastError, toastLoading } = useToastMessage();

  const handleLogin = async () => {
    if (!email) {
      toastError("Email is required");
      return;
    }
    if (!password) {
      toastError("Password is required");
      return;
    }

    try {
      setLoading(true);
      toastLoading("Logging in...");

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toastError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      toastSuccess("Login successful 🎉");
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error", err);
      toastError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20 text-white">
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
        className="bg-amber-500 py-2 rounded mt-2"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Sign up link */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-amber-400 font-bold cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;