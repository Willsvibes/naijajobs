import mongoose, { Document, Types } from "mongoose";

export interface IApplication extends Document {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  employer: Types.ObjectId;
  coverLetter?: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
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
    coverLetter: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
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

export const Application = mongoose.model<IApplication>("Application", applicationSchema);