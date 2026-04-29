import { configDotenv } from "dotenv";
import express from "express";
import cors from 'cors';
import { authRouter } from "./routes/auth";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth";
import { profileRouter } from "./routes/profile";
import jobRouter from "./routes/jobs";
import { allowRoles } from "./middleware/allowRoles";
import adminRouter from "./routes/adminRoutes";

configDotenv();

const MONGODB_URI = process.env.MONGO_URI || "";

if (!MONGODB_URI) {
    console.error("FATAL: MONGO_URI is not set in environment variables.");
    process.exit(1);
}

const app = express();

// CORS — allow frontend origins from env, fallback to localhost for dev
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174").split(",");
app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
}));
app.use(express.json());

// --- Routes ---

// Public
app.use("/api/auth", authRouter);

// Protected — all authenticated users can browse & view jobs
app.use("/api/jobs", authMiddleware, jobRouter);

// Protected — profile management
app.use("/api/profile", profileRouter);

// Admin only
app.use("/api/admin", authMiddleware, allowRoles("admin"), adminRouter);

// Health check
app.get("/", (_req, res) => {
    res.json({ status: "ok", message: "NaijaJobs API is running" });
});

// --- Database & Server Start ---
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((error: Error) => {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    });