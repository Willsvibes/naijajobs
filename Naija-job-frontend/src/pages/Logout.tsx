import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosInstance";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post("/auth/logout");
    } catch {
      // even if the API call fails, clear local state
    } finally {
      logout(); // clear Zustand + localStorage
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 w-full text-slate-300 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <LogOut
        size={20}
        className="text-slate-400 group-hover:text-red-400 transition-colors duration-300"
      />
      <span className="font-medium text-sm">
        {loading ? "Signing out..." : "Sign Out"}
      </span>
    </button>
  );
};

export default LogoutButton;