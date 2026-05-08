import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import {
  Lock, Trash2, Bell, Shield, User,
  Loader2, Eye, EyeOff, LogOut,
  ChevronRight, Check, AlertTriangle,
} from "lucide-react";

type Section = "account" | "notifications" | "security" | "danger";

const sidebarItems: { id: Section; label: string; icon: any; danger?: boolean }[] = [
  { id: "account",       label: "Account",       icon: User        },
  { id: "notifications", label: "Notifications", icon: Bell        },
  { id: "security",      label: "Security",      icon: Shield      },
  { id: "danger",        label: "Danger Zone",   icon: AlertTriangle, danger: true },
];

const FieldRow = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-800/60 last:border-0 group">
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-0.5">{label}</p>
      <p className="text-white text-sm font-medium">{value}</p>
      {hint && <p className="text-slate-600 text-xs mt-0.5">{hint}</p>}
    </div>
    <ChevronRight size={16} className="text-slate-700" />
  </div>
);

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
      enabled ? "bg-amber-500" : "bg-slate-700"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Settings = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToastMessage();

  const [activeSection, setActiveSection] = useState<Section>("account");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [notifs, setNotifs] = useState({
    applicationUpdates: true,
    newJobAlerts: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toastError("Please fill in all fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toastError("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toastError("Password must be at least 8 characters");
      return;
    }
    try {
      setSavingPassword(true);
      await api.patch("/profile/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toastSuccess("Password updated!");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      toastError(err.response?.data?.message || "Failed to update password");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") {
      toastError('Type "DELETE" to confirm');
      return;
    }
    try {
      setDeleting(true);
      await api.delete("/profile");
      logout();
      navigate("/");
    } catch (err: any) {
      toastError(err.response?.data?.message || "Failed to delete account");
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    logout();
    navigate("/");
  };

  // ── Section: Account ────────────────────────
  const renderAccount = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Account</h2>
        <p className="text-slate-500 text-sm">Your personal information</p>
      </div>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800/60">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-black text-black shadow-lg shadow-amber-500/20 shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white font-bold">{user?.name}</p>
          <p className="text-slate-400 text-sm">{user?.email}</p>
          <span className="inline-flex items-center mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Basic Info</p>
        <div className="bg-slate-800/30 rounded-2xl px-5 border border-slate-700/30">
          <FieldRow label="Name" value={user?.name || "—"} />
          <FieldRow label="Email" value={user?.email || "—"} hint="Cannot be changed" />
          <FieldRow label="Role" value={user?.role || "—"} />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 text-slate-300 hover:text-white hover:border-slate-600 transition-all group"
      >
        <LogOut size={18} className="text-slate-500 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium">Sign Out</span>
        <ChevronRight size={16} className="text-slate-600 ml-auto" />
      </button>
    </div>
  );

  // ── Section: Notifications ──────────────────
  const renderNotifications = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
        <p className="text-slate-500 text-sm">Choose what you want to hear about</p>
      </div>

      <div className="space-y-3">
        {[
          { key: "applicationUpdates", label: "Application updates",  desc: "When your application status changes"  },
          { key: "newJobAlerts",        label: "New job alerts",        desc: "Jobs matching your profile"            },
          { key: "emailNotifications",  label: "Email notifications",  desc: "Receive updates via email"             },
          { key: "pushNotifications",   label: "Push notifications",   desc: "In-app real-time alerts"              },
        ].map(({ key, label, desc }) => (
          <div
            key={key}
            className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-colors"
          >
            <div>
              <p className="text-white text-sm font-medium">{label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
            </div>
            <Toggle
              enabled={notifs[key as keyof typeof notifs]}
              onChange={() => setNotifs({ ...notifs, [key]: !notifs[key as keyof typeof notifs] })}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // ── Section: Security ───────────────────────
  const renderSecurity = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Security</h2>
        <p className="text-slate-500 text-sm">Keep your account safe</p>
      </div>

      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 space-y-5">
        {(["current", "new", "confirm"] as const).map((field) => {
          const labels  = { current: "Current Password", new: "New Password", confirm: "Confirm New Password" };
          const keys    = { current: "currentPassword",  new: "newPassword",  confirm: "confirmPassword"      } as const;
          return (
            <div key={field}>
              <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                {labels[field]}
              </label>
              <div className="relative">
                <input
                  type={showPass[field] ? "text" : "password"}
                  value={passwordForm[keys[field]]}
                  onChange={(e) => setPasswordForm({ ...passwordForm, [keys[field]]: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-transparent transition placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPass({ ...showPass, [field]: !showPass[field] })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={handlePasswordChange}
          disabled={savingPassword}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 ${
            passwordSuccess
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20"
          }`}
        >
          {savingPassword ? (
            <><Loader2 size={16} className="animate-spin" /> Updating...</>
          ) : passwordSuccess ? (
            <><Check size={16} /> Password Updated!</>
          ) : (
            <><Lock size={16} /> Update Password</>
          )}
        </button>
      </div>
    </div>
  );

  // ── Section: Danger Zone ────────────────────
  const renderDanger = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Danger Zone</h2>
        <p className="text-slate-500 text-sm">Irreversible actions — proceed carefully</p>
      </div>

      <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/20 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Delete your account</p>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Your account and all associated data will be permanently removed. This cannot be undone.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
            Type <span className="text-red-400 font-bold">DELETE</span> to confirm
          </label>
          <input
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            placeholder="DELETE"
            className="w-full bg-slate-900/50 border border-red-500/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition placeholder-slate-600"
          />
        </div>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting || deleteInput !== "DELETE"}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          {deleting ? "Deleting..." : "Delete My Account"}
        </button>
      </div>
    </div>
  );

  const sections: Record<Section, React.ReactNode> = {
    account:       renderAccount(),
    notifications: renderNotifications(),
    security:      renderSecurity(),
    danger:        renderDanger(),
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">

          {/* ── Sidebar ─────────────────────────── */}
          <div className="sm:w-52 shrink-0">
            {/* Mobile: horizontal scroll tabs */}
            {/* Desktop: vertical list */}
            <nav className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 sm:bg-slate-900/40 sm:rounded-2xl sm:border sm:border-slate-800 sm:p-2">
              {sidebarItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap w-full text-left ${
                      isActive
                        ? item.danger
                          ? "bg-red-500/10 border border-red-500/20 text-red-400"
                          : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        : item.danger
                          ? "text-red-500/50 hover:bg-red-500/5 hover:text-red-400 border border-transparent"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── Content ─────────────────────────── */}
          <div className="flex-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
            {sections[activeSection]}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;