import React, { useState } from "react";

export interface FilterValues {
  location: string;
  minPay?: string ;
  jobType?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

const FilterModal: React.FC<Props> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterValues>({
    location: "",
    minPay: "",
    jobType: "",
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
      <div className="bg-white rounded-t-2xl md:rounded-xl p-6 w-full md:w-96 shadow-xl animate-slide-up">
        <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>

        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onInput={e => setFilters({ ...filters, location: e.currentTarget.value })}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          type="number"
          placeholder="Minimum pay"
          value={filters.minPay}
          onInput={e => setFilters({ ...filters, minPay: e.currentTarget.value})}
          className="w-full p-3 border rounded mb-3"
        />

        <select
          value={filters.jobType}
          onInput={e => setFilters({ ...filters, jobType: e.currentTarget.value })}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select job type</option>
          {jobTypes.map(type => <option key={type}>{type}</option>)}
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;