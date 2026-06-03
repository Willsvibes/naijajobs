import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Loader2, UserCircle2 } from "lucide-react";
import api from "../../api/axiosInstance";
import type { AdminUser } from "./types";
import { UserProfileCard } from "../UserDetail/userProfileCard";
import { UserJobsList, type UserJob } from "../UserDetail/userServices";
import { UserApplicationsList, type UserApplication } from "../UserDetail/userApplication";

interface UserDetailData {
  user: AdminUser;
  jobs: UserJob[];
  applications: UserApplication[];
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData]         = useState<UserDetailData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/admin/users/${id}`);
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleBanToggle = async () => {
    if (!data) return;
    const { user } = data;
    setActionId(user._id);
    try {
      const endpoint = user.banned
        ? `/admin/users/${user._id}/unban`
        : `/admin/users/${user._id}/ban`;
      await api.patch(endpoint);
      setData((prev) =>
        prev ? { ...prev, user: { ...prev.user, banned: !prev.user.banned } } : prev
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async () => {
    if (!data) return;
    const { user } = data;
    if (!confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    setActionId(user._id);
    try {
      await api.delete(`/admin/users/${user._id}`);
      navigate("/dashboard", { replace: true });
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-amber-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || "User not found"}</p>
        <button onClick={() => navigate(-1)} className="text-amber-400 text-sm underline">
          Go back
        </button>
      </div>
    );
  }

  const { user, jobs, applications } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <UserProfileCard
          user={user}
          actionId={actionId}
          onBanToggle={handleBanToggle}
          onDelete={handleDelete}
        />

        {user.role === "employer" && <UserJobsList jobs={jobs} />}

        {user.role === "employee" && <UserApplicationsList applications={applications} />}

        {user.role === "admin" && (
          <div className="flex items-center gap-2 p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
            <UserCircle2 size={15} className="text-slate-500" />
            <p className="text-slate-500 text-sm">This is an admin account.</p>
          </div>
        )}

      </div>
    </div>
  );
}