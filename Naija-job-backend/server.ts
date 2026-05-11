import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth.js";
import { profileRouter } from "./routes/profile.js";
import jobRouter from "./routes/jobs.js";
import { allowRoles } from "./middleware/allowRoles.js";
import adminRouter from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import { applicationRouter, notificationRouter } from "./routes/applicationRoutes.js";

configDotenv();

const MONGODB_URI = process.env.MONGO_URI || "";

if (!MONGODB_URI) {
  console.error("FATAL: MONGO_URI is not set in environment variables.");
  process.exit(1);
}

const app = express();

// ✅ CORS (this part is GOOD)
const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,http://localhost:5174"
).split(",");

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ MOVE THIS UP HERE 👇 (IMPORTANT)
app.use(cookieParser());

// --- Routes ---

// Public
app.use("/api/auth", authRouter);

// Protected — jobs
app.use("/api/jobs", authMiddleware, jobRouter);

// Profile
app.use("/api/profile", profileRouter);

// Protected — applications & notifications


app.use("/api/applications", applicationRouter);
app.use("/api/notifications", notificationRouter);

// Admin
app.use("/api/admin", authMiddleware, allowRoles("admin"), adminRouter);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "NaijaJobs API is running" });
});

// --- DB ---
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });