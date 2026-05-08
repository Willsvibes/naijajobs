import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employer", "employee", "admin"],
      default: "employee",
    },
    refreshToken: { type: String, default: "" },
    skills: [String],
    companyName: String,
    bio: String,
    banned: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);