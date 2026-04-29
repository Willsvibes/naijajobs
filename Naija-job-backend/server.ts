import { configDotenv } from "dotenv";
import express from "express";
import cors from 'cors'
import { authRouter } from "./routes/auth";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth";
import { profileRouter } from "./routes/profile";
import jobRouter from "./routes/jobs";
import { allowRoles } from "./middleware/allowRoles";
import adminRouter from "./routes/adminRoutes";

configDotenv();

const MONGODB_URI = process.env.MONGO_URI || " "

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter)

app.use("/api/jobs", authMiddleware, allowRoles("employer"), jobRouter)

app.use("/api/profile", profileRouter);
app.use("/api/admin", authMiddleware, allowRoles("admin"), adminRouter);

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error: Error) => console.log(error));

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));