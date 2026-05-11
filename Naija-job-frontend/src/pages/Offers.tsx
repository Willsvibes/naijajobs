import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  PackageCheck,
  Search,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import api from "../api/axiosInstance";
import type { ApplicationStatus } from "../types/application";

interface Offer {
  _id: string;
  proposal?: string;
  portfolioImages: string[];
  status: ApplicationStatus;
  createdAt: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
    skills?: string[];
    bio?: string;
  } | null;
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    category: string;
    jobType: string;
    workImages?: string[];
  } | null;
}

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  reviewed: { label: "Reviewed", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  accepted: { label: "Accepted", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  rejected: { label: "Declined", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  in_progress: { label: "In Progress", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  completed: { label: "Completed", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  cancelled: { label: "Cancelled", className: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await api.get<Offer[]>("/applications/received");
      setOffers(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const haystack = [
        offer.applicant?.name,
        offer.applicant?.email,
        offer.job?.title,
        offer.job?.location,
        offer.job?.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || offer.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [offers, query, statusFilter]);

  const updateStatus = async (offerId: string, status: ApplicationStatus) => {
    try {
      setUpdatingId(offerId);
      const res = await api.patch(`/applications/${offerId}/status`, { status });
      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === offerId ? { ...offer, status: res.data.application.status } : offer
        )
      );
      toast.success(`Offer marked ${statusConfig[status].label.toLowerCase()}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update offer");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Offers Received</h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Review service providers, inspect their previous work, and move accepted offers through delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search provider, service, or location"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as ApplicationStatus | "all")}
              className="bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">All statuses</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={34} className="animate-spin text-amber-500" />
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="border border-dashed border-slate-800 rounded-3xl py-24 text-center bg-slate-900/30">
            <PackageCheck size={42} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-400">No offers match your filters yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredOffers.map((offer) => {
              const status = statusConfig[offer.status];
              const applicantName = offer.applicant?.name ?? "Unknown provider";
              const applicantEmail = offer.applicant?.email ?? "No email available";
              const jobTitle = offer.job?.title ?? "Deleted service request";
              const jobLocation = offer.job?.location ?? "Location unavailable";
              const jobCategory = offer.job?.category ?? "Archived request";
              const portfolioImages = offer.portfolioImages ?? [];
              const workImages = offer.job?.workImages ?? [];

              return (
                <article
                  key={offer._id}
                  className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
                        {jobCategory}
                      </p>
                      <h2 className="text-xl font-bold text-white">{jobTitle}</h2>
                      <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                        <MapPin size={14} />
                        {jobLocation}
                      </p>
                    </div>
                    <span className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500 text-black font-black flex items-center justify-center">
                      {applicantName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{applicantName}</p>
                      <p className="text-slate-500 text-sm">{applicantEmail}</p>
                    </div>
                  </div>

                  {offer.proposal && (
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                      {offer.proposal}
                    </p>
                  )}

                  {portfolioImages.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">
                        Previous Work
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {portfolioImages.map((image, index) => (
                          <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={`Previous work ${index + 1}`}
                            className="h-28 w-full object-cover rounded-xl border border-slate-700 bg-slate-800"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {workImages.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">
                        Work Request Images
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {workImages.slice(0, 3).map((image, index) => (
                          <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={`Requested work ${index + 1}`}
                            className="h-20 w-full object-cover rounded-xl border border-slate-700 bg-slate-800"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <button
                      type="button"
                      disabled={updatingId === offer._id}
                      onClick={() => updateStatus(offer._id, "accepted")}
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2.5 text-xs font-bold hover:bg-emerald-500/20 disabled:opacity-50"
                    >
                      <CheckCircle size={14} />
                      Accept
                    </button>
                    <button
                      type="button"
                      disabled={updatingId === offer._id}
                      onClick={() => updateStatus(offer._id, "in_progress")}
                      className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 py-2.5 text-xs font-bold hover:bg-cyan-500/20 disabled:opacity-50"
                    >
                      <Clock size={14} />
                      Start
                    </button>
                    <button
                      type="button"
                      disabled={updatingId === offer._id}
                      onClick={() => updateStatus(offer._id, "completed")}
                      className="flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 py-2.5 text-xs font-bold hover:bg-green-500/20 disabled:opacity-50"
                    >
                      <PackageCheck size={14} />
                      Complete
                    </button>
                    <button
                      type="button"
                      disabled={updatingId === offer._id}
                      onClick={() => updateStatus(offer._id, "rejected")}
                      className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 text-xs font-bold hover:bg-red-500/20 disabled:opacity-50"
                    >
                      <XCircle size={14} />
                      Decline
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
