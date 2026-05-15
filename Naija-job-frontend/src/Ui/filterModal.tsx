import React, { useState } from "react";
import { MapPin, Wallet, Briefcase, X, SlidersHorizontal } from "lucide-react";

export interface FilterValues {
  location: string;
  minPay?: string;
  jobType?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  currentFilters?: FilterValues;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

const FilterModal: React.FC<Props> = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [filters, setFilters] = useState<FilterValues>(
    currentFilters ?? { location: "", minPay: "", jobType: "" }
  );

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const empty = { location: "", minPay: "", jobType: "" };
    setFilters(empty);
    onApply(empty);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 w-full md:w-[420px] shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <SlidersHorizontal size={16} className="text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Filter Jobs</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Location */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Location
            </label>
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 focus-within:border-amber-500/50 transition-all">
              <MapPin size={16} className="text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="e.g. Lagos, Abuja..."
                value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}
                className="bg-transparent outline-none text-white placeholder-slate-500 w-full text-sm"
              />
            </div>
          </div>

          {/* Minimum Pay */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Minimum Pay (₦)
            </label>
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 focus-within:border-amber-500/50 transition-all">
              <Wallet size={16} className="text-slate-500 shrink-0" />
              <input
                type="number"
                placeholder="e.g. 50000"
                value={filters.minPay}
                onChange={e => setFilters({ ...filters, minPay: e.target.value })}
                className="bg-transparent outline-none text-white placeholder-slate-500 w-full text-sm"
              />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Job Type
            </label>
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 focus-within:border-amber-500/50 transition-all">
              <Briefcase size={16} className="text-slate-500 shrink-0" />
              <select
                value={filters.jobType}
                onChange={e => setFilters({ ...filters, jobType: e.target.value })}
                className="bg-transparent outline-none text-white w-full text-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">Select job type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type} className="bg-slate-900">{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 my-6" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-700 text-slate-300 font-semibold hover:border-amber-500/40 hover:text-amber-400 transition-all"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 rounded-2xl bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-black transition-all shadow-lg hover:shadow-amber-500/25"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;