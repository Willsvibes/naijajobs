import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getProfile, updateProfile } from "../controllers/profileController";


export const profileRouter = Router();

profileRouter.get("/", authMiddleware, getProfile);  


profileRouter.put("/", authMiddleware, updateProfile)
