import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import api from "../api/axiosInstance";
import type { ApplicationStatus } from "../types/application";
import { PageLoader } from "../Ui/pageLoader";
import { OfferCard } from "./offers/OfferCard";
import { OffersEmptyState } from "./offers/OffersEmptyState";
import { OffersFilters } from "./offers/OffersFilters";
import { offerStatusConfig } from "./offers/statusConfig";
import type { Offer } from "./offers/types";

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
      toast.success(`Offer marked ${offerStatusConfig[status].label.toLowerCase()}`);
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

          <OffersFilters
            query={query}
            statusFilter={statusFilter}
            onQueryChange={setQuery}
            onStatusChange={setStatusFilter}
          />
        </div>

        {loading ? (
          <PageLoader label="Loading offers" fullScreen={false} />
        ) : filteredOffers.length === 0 ? (
          <OffersEmptyState />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredOffers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                updatingId={updatingId}
                onUpdateStatus={updateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
