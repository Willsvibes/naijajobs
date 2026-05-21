import { ChevronRight } from "lucide-react";

export const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
    <p className="text-slate-500 text-sm">{description}</p>
  </div>
);

export const FieldRow = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-800/60 last:border-0 group">
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-0.5">
        {label}
      </p>
      <p className="text-white text-sm font-medium">{value}</p>
      {hint && <p className="text-slate-600 text-xs mt-0.5">{hint}</p>}
    </div>
    <ChevronRight size={16} className="text-slate-700" />
  </div>
);

export const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
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
