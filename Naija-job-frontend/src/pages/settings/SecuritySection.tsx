import { Check, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { SectionHeader } from "./SettingsShared";
import type { PasswordForm, ShowPasswordState } from "./types";

interface SecuritySectionProps {
  passwordForm: PasswordForm;
  showPass: ShowPasswordState;
  savingPassword: boolean;
  passwordSuccess: boolean;
  onPasswordFormChange: (form: PasswordForm) => void;
  onShowPassChange: (state: ShowPasswordState) => void;
  onPasswordChange: () => void;
}

const passwordFields = [
  { id: "current", label: "Current Password", key: "currentPassword" },
  { id: "new", label: "New Password", key: "newPassword" },
  { id: "confirm", label: "Confirm New Password", key: "confirmPassword" },
] as const;

export const SecuritySection = ({
  passwordForm,
  showPass,
  savingPassword,
  passwordSuccess,
  onPasswordFormChange,
  onShowPassChange,
  onPasswordChange,
}: SecuritySectionProps) => (
  <div>
    <SectionHeader title="Security" description="Keep your account safe" />

    <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 space-y-5">
      {passwordFields.map((field) => (
        <div key={field.id}>
          <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
            {field.label}
          </label>
          <div className="relative">
            <input
              type={showPass[field.id] ? "text" : "password"}
              value={passwordForm[field.key]}
              onChange={(event) =>
                onPasswordFormChange({
                  ...passwordForm,
                  [field.key]: event.target.value,
                })
              }
              placeholder="********"
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-transparent transition placeholder-slate-600"
            />
            <button
              type="button"
              onClick={() =>
                onShowPassChange({ ...showPass, [field.id]: !showPass[field.id] })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPass[field.id] ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onPasswordChange}
        disabled={savingPassword}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 ${
          passwordSuccess
            ? "bg-emerald-500 text-white"
            : "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20"
        }`}
      >
        {savingPassword ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Updating...
          </>
        ) : passwordSuccess ? (
          <>
            <Check size={16} /> Password Updated!
          </>
        ) : (
          <>
            <Lock size={16} /> Update Password
          </>
        )}
      </button>
    </div>
  </div>
);
