import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import { useAuthStore } from "../store/useAuthStore";
import { AccountSection } from "./settings/AccountSection";
import { DangerSection } from "./settings/DangerSection";
import { NotificationsSection } from "./settings/NotificationsSection";
import { SecuritySection } from "./settings/SecuritySection";
import { SettingsSidebar } from "./settings/SettingsSidebar";
import type {
  NotificationPrefs,
  PasswordForm,
  SettingsSection,
  ShowPasswordState,
} from "./settings/types";

const Settings = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToastMessage();

  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState<ShowPasswordState>({
    current: false,
    new: false,
    confirm: false,
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [notifs, setNotifs] = useState<NotificationPrefs>({
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
    try {
      await api.post("/auth/logout");
    } catch {
      // Local logout still clears the session store when the server is unreachable.
    }
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <div className="flex-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
            {activeSection === "account" && (
              <AccountSection user={user} onLogout={handleLogout} />
            )}
            {activeSection === "notifications" && (
              <NotificationsSection notifs={notifs} onChange={setNotifs} />
            )}
            {activeSection === "security" && (
              <SecuritySection
                passwordForm={passwordForm}
                showPass={showPass}
                savingPassword={savingPassword}
                passwordSuccess={passwordSuccess}
                onPasswordFormChange={setPasswordForm}
                onShowPassChange={setShowPass}
                onPasswordChange={handlePasswordChange}
              />
            )}
            {activeSection === "danger" && (
              <DangerSection
                deleteInput={deleteInput}
                deleting={deleting}
                onDeleteInputChange={setDeleteInput}
                onDeleteAccount={handleDeleteAccount}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
