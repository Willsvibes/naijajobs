import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/profileController.js";

export const profileRouter = Router();

profileRouter.get("/", authMiddleware, getProfile);
profileRouter.put("/", authMiddleware, updateProfile);
profileRouter.patch("/change-password", authMiddleware, changePassword);
profileRouter.delete("/", authMiddleware, deleteAccount);