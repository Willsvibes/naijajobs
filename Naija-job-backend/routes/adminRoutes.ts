import express from "express";
import { getAdminStats } from "../controllers/adminController";
import  {authMiddleware}  from "../middleware/auth";
import { allowRoles } from "../middleware/allowRoles";

const router = express.Router();

router.get("/stats", getAdminStats);

export default router;