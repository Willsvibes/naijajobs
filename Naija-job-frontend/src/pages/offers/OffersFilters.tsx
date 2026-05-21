import { Search } from "lucide-react";
import type { ApplicationStatus } from "../../types/application";
import { offerStatusConfig } from "./statusConfig";

interface OffersFiltersProps {
  query: string;
  statusFilter: ApplicationStatus | "all";
  onQueryChange: (query: string) => void;
  onStatusChange: (status: ApplicationStatus | "all") => void;
}

export const OffersFilters = ({
  query,
  statusFilter,
  onQueryChange,
  onStatusChange,
}: OffersFiltersProps) => (
  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
    <div className="relative flex-1 lg:w-80">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search provider, service, or location"
        className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
      />
    </div>
    <select
      value={statusFilter}
      onChange={(event) =>
        onStatusChange(event.target.value as ApplicationStatus | "all")
      }
      className="bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-500/50"
    >
      <option value="all">All statuses</option>
      {Object.entries(offerStatusConfig).map(([status, config]) => (
        <option key={status} value={status}>
          {config.label}
        </option>
      ))}
    </select>
  </div>
);
