import mongoose, { Document, Types } from "mongoose";

export interface IApplication extends Document {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  employer: Types.ObjectId;
  proposal?: string;
  portfolioImages: string[];
  status: "pending" | "reviewed" | "accepted" | "rejected" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new mongoose.Schema<IApplication>(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proposal: {
      type: String,
      default: "",
    },
    portfolioImages: {
      type: [String],
      required: true,
      validate: {
        validator: (images: string[]) =>
          Array.isArray(images) &&
          images.length > 0 &&
          images.every((image) => typeof image === "string" && image.trim().length > 0),
        message: "At least one previous work image is required",
      },
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Fast lookup: all applications for a job (employer view)
applicationSchema.index({ job: 1 });

// Fast lookup: all applications by a user (employee view)
applicationSchema.index({ applicant: 1 });

// Fast lookup: all offers received by a client/employer.
applicationSchema.index({ employer: 1, createdAt: -1 });

export const Application = mongoose.model<IApplication>("Application", applicationSchema);
