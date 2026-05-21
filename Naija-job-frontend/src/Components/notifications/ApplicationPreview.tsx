import type { Notification } from "./types";

interface ApplicationPreviewProps {
  application: NonNullable<Notification["application"]>;
  updatingApplicationId: string | null;
  onUpdateApplicationStatus: (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => void;
}

export const ApplicationPreview = ({
  application,
  updatingApplicationId,
  onUpdateApplicationStatus,
}: ApplicationPreviewProps) => (
  <div className="mt-4 space-y-4">
    {application.proposal && (
      <p className="text-sm text-slate-300 bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
        {application.proposal}
      </p>
    )}

    {application.portfolioImages && application.portfolioImages.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {application.portfolioImages.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={`Previous work ${index + 1}`}
            className="h-24 w-full object-cover rounded-xl border border-slate-700 bg-slate-800"
          />
        ))}
      </div>
    )}

    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-slate-500 capitalize">
        Status: {application.status}
      </span>
      <ActionButton
        label="Accept"
        disabled={updatingApplicationId === application._id}
        className="bg-emerald-500 hover:bg-emerald-400"
        onClick={() => onUpdateApplicationStatus(application._id, "accepted")}
      />
      <ActionButton
        label="Decline"
        disabled={updatingApplicationId === application._id}
        className="bg-red-500 hover:bg-red-400"
        onClick={() => onUpdateApplicationStatus(application._id, "rejected")}
      />
    </div>
  </div>
);

interface ActionButtonProps {
  label: string;
  disabled: boolean;
  className: string;
  onClick: () => void;
}

const ActionButton = ({
  label,
  disabled,
  className,
  onClick,
}: ActionButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={(event) => {
      event.stopPropagation();
      onClick();
    }}
    className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold disabled:opacity-50 ${className}`}
  >
    {label}
  </button>
);
