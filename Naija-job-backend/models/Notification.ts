import mongoose, { Document, Types } from "mongoose";

export interface INotification extends Document {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  job?: Types.ObjectId;
  application?: Types.ObjectId;
  type:
    | "new_application"       // employer ← employee applies
    | "application_update"    // employee ← employer changes status
    | "new_job_posted"        // admin    ← employer posts a job
    | "new_user_registered";  // admin    ← anyone registers
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new mongoose.Schema<INotification>(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: false,
    },
    type: {
      type: String,
      enum: [
        "new_application",
        "application_update",
        "new_job_posted",
        "new_user_registered",
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, read: 1 });

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);