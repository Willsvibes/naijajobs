import { PackageCheck } from "lucide-react";

export const OffersEmptyState = () => (
  <div className="border border-dashed border-slate-800 rounded-3xl py-24 text-center bg-slate-900/30">
    <PackageCheck size={42} className="mx-auto text-slate-700 mb-4" />
    <p className="text-slate-400">No offers match your filters yet.</p>
  </div>
);
