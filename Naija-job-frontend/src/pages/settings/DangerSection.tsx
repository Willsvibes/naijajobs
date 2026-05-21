import { Loader2, Trash2 } from "lucide-react";
import { SectionHeader } from "./SettingsShared";

interface DangerSectionProps {
  deleteInput: string;
  deleting: boolean;
  onDeleteInputChange: (value: string) => void;
  onDeleteAccount: () => void;
}

export const DangerSection = ({
  deleteInput,
  deleting,
  onDeleteInputChange,
  onDeleteAccount,
}: DangerSectionProps) => (
  <div>
    <SectionHeader
      title="Danger Zone"
      description="Irreversible actions need careful confirmation"
    />

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
          onChange={(event) => onDeleteInputChange(event.target.value)}
          placeholder="DELETE"
          className="w-full bg-slate-900/50 border border-red-500/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition placeholder-slate-600"
        />
      </div>

      <button
        type="button"
        onClick={onDeleteAccount}
        disabled={deleting || deleteInput !== "DELETE"}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
        {deleting ? "Deleting..." : "Delete My Account"}
      </button>
    </div>
  </div>
);
