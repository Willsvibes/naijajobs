import { Inbox, Plus } from "lucide-react";

interface EmployerHeaderProps {
  onPostRequest: () => void;
  onViewOffers: () => void;
}

export const EmployerHeader = ({ onPostRequest, onViewOffers }: EmployerHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
    <div>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2">
        Client Dashboard
      </h1>
      <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
        Manage service requests, review offers, and track delivery.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <button
        onClick={onViewOffers}
        className="flex items-center justify-center gap-2 border border-slate-700 text-slate-200 hover:border-amber-500/40 hover:text-amber-400 px-5 py-3 sm:px-6 sm:py-4 rounded-2xl text-sm sm:text-base font-bold transition-all w-full sm:w-auto"
      >
        <Inbox size={18} strokeWidth={2.5} />
        View Offers
      </button>
      <button
        onClick={onPostRequest}
        className="flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-5 py-3 sm:px-8 sm:py-4 rounded-2xl text-sm sm:text-base font-bold text-black transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
      >
        <Plus size={18} strokeWidth={2.5} />
        Post Request
      </button>
    </div>
  </div>
);
