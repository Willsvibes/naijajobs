import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import {
  Lock, Trash2, Bell, Shield,
  Loader2, Eye, EyeOff, LogOut, ChevronRight,
} from "lucide-react";

const Settings = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToastMessage();

  // Password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Notifications toggle (UI only for now)
  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    applications: true,
    jobs: false,
  });

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toastError("Please fill in all password fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toastError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toastError("New password must be at least 8 characters");
      return;
    }

    try {
      setSavingPassword(true);
      await api.patch("/profile/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toastSuccess("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toastError(err.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") {
      toastError('Please type "DELETE" to confirm');
      return;
    }
    try {
      setDeleting(true);
      await api.delete("/profile");
      logout();
      navigate("/");
    } catch (err: any) {
      toastError(err.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    logout();
    navigate("/");
  };

  const SectionHeader = ({ icon: Icon, title, subtitle }: any) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <Icon size={20} className="text-amber-400" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
          <p className="text-slate-400 mt-2 text-sm">Manage your account preferences and security.</p>
        </div>

        {/* Account Info */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-amber-500/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">{user?.name}</p>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
          <SectionHeader icon={Lock} title="Change Password" subtitle="Use a strong password you don't use elsewhere" />

          <div className="space-y-4">
            {(["current", "new", "confirm"] as const).map((field) => {
              const labels = { current: "Current Password", new: "New Password", confirm: "Confirm New Password" };
              const names = { current: "currentPassword", new: "newPassword", confirm: "confirmPassword" } as const;
              return (
                <div key={field}>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">{labels[field]}</label>
                  <div className="relative">
                    <input
                      type={showPasswords[field] ? "text" : "password"}
                      value={passwordForm[names[field]]}
                      onChange={(e) => setPasswordForm({ ...passwordForm, [names[field]]: e.target.value })}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPasswords[field] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              onClick={handlePasswordChange}
              disabled={savingPassword}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/15 active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {savingPassword ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
              {savingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
          <SectionHeader icon={Bell} title="Notifications" subtitle="Choose what you want to be notified about" />

          <div className="space-y-3">
            {[
              { key: "email", label: "Email notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push notifications", desc: "In-app notifications" },
              { key: "applications", label: "Application updates", desc: "When your application status changes" },
              { key: "jobs", label: "New job alerts", desc: "When new jobs matching your skills are posted" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifSettings({ ...notifSettings, [key]: !notifSettings[key as keyof typeof notifSettings] })}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                    notifSettings[key as keyof typeof notifSettings] ? "bg-amber-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                      notifSettings[key as keyof typeof notifSettings] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
          <SectionHeader icon={Shield} title="Account" subtitle="Manage your account" />

          <div className="space-y-3">
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/30 border border-slate-700/30 text-slate-300 hover:text-white hover:border-slate-600 transition-all group"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Sign out</span>
              </div>
              <ChevronRight size={16} className="text-slate-600" />
            </button>

            {/* Delete Account */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Trash2 size={18} />
                <span className="text-sm font-medium">Delete account</span>
              </div>
              <ChevronRight size={16} className="text-red-500/50" />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={() => setShowDeleteConfirm(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
                  <Trash2 size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">Delete your account?</h3>
                <p className="text-slate-400 text-sm text-center mb-6">
                  This action is permanent and cannot be undone. All your data will be deleted.
                </p>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-400 mb-2">
                    Type <span className="text-red-400 font-bold">DELETE</span> to confirm
                  </label>
                  <input
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                    placeholder="DELETE"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:border-red-500/50 transition"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowDeleteConfirm(false); setDeleteInput(""); }}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleting || deleteInput !== "DELETE"}
                    className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold transition disabled:opacity-40 text-sm flex items-center justify-center gap-2"
                  >
                    {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    {deleting ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;