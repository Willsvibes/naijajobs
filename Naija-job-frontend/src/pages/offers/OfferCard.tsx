import type { ReactNode } from "react";
import { CheckCircle, Clock, MapPin, PackageCheck, XCircle } from "lucide-react";
import type { ApplicationStatus } from "../../types/application";
import { offerStatusConfig } from "./statusConfig";
import type { Offer } from "./types";

interface OfferCardProps {
  offer: Offer;
  updatingId: string | null;
  onUpdateStatus: (offerId: string, status: ApplicationStatus) => void;
}

export const OfferCard = ({
  offer,
  updatingId,
  onUpdateStatus,
}: OfferCardProps) => {
  const status = offerStatusConfig[offer.status];
  const applicantName = offer.applicant?.name ?? "Unknown provider";
  const applicantEmail = offer.applicant?.email ?? "No email available";
  const jobTitle = offer.job?.title ?? "Deleted service request";
  const jobLocation = offer.job?.location ?? "Location unavailable";
  const jobCategory = offer.job?.category ?? "Archived request";
  const portfolioImages = offer.portfolioImages ?? [];
  const workImages = offer.job?.workImages ?? [];

  return (
    <article className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
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
        <span
          className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border ${status.className}`}
        >
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
        <ImageStrip
          title="Previous Work"
          images={portfolioImages}
          columns="grid-cols-2 sm:grid-cols-3"
          imageClassName="h-28"
          altPrefix="Previous work"
        />
      )}

      {workImages.length > 0 && (
        <ImageStrip
          title="Work Request Images"
          images={workImages.slice(0, 3)}
          columns="grid-cols-3"
          imageClassName="h-20"
          altPrefix="Requested work"
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        <StatusButton
          icon={<CheckCircle size={14} />}
          label="Accept"
          disabled={updatingId === offer._id}
          className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
          onClick={() => onUpdateStatus(offer._id, "accepted")}
        />
        <StatusButton
          icon={<Clock size={14} />}
          label="Start"
          disabled={updatingId === offer._id}
          className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20"
          onClick={() => onUpdateStatus(offer._id, "in_progress")}
        />
        <StatusButton
          icon={<PackageCheck size={14} />}
          label="Complete"
          disabled={updatingId === offer._id}
          className="bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
          onClick={() => onUpdateStatus(offer._id, "completed")}
        />
        <StatusButton
          icon={<XCircle size={14} />}
          label="Decline"
          disabled={updatingId === offer._id}
          className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
          onClick={() => onUpdateStatus(offer._id, "rejected")}
        />
      </div>
    </article>
  );
};

interface ImageStripProps {
  title: string;
  images: string[];
  columns: string;
  imageClassName: string;
  altPrefix: string;
}

const ImageStrip = ({
  title,
  images,
  columns,
  imageClassName,
  altPrefix,
}: ImageStripProps) => (
  <div>
    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">
      {title}
    </p>
    <div className={`grid ${columns} gap-3`}>
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt={`${altPrefix} ${index + 1}`}
          className={`${imageClassName} w-full object-cover rounded-xl border border-slate-700 bg-slate-800`}
        />
      ))}
    </div>
  </div>
);

interface StatusButtonProps {
  icon: ReactNode;
  label: string;
  disabled: boolean;
  className: string;
  onClick: () => void;
}

const StatusButton = ({
  icon,
  label,
  disabled,
  className,
  onClick,
}: StatusButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold disabled:opacity-50 ${className}`}
  >
    {icon}
    {label}
  </button>
);
