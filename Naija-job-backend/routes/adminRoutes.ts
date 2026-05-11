import express from "express";
import {
  getAdminStats,
  getAllUsers,
  getAllJobs,
  banUser,
  unbanUser,
  adminDeleteJob,
  adminDeleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/jobs", getAllJobs);
router.patch("/users/:userId/ban",  banUser);
router.patch("/users/:userId/unban", unbanUser);
router.delete("/jobs/:jobId", adminDeleteJob);
router.delete("/users/:userId",adminDeleteUser);

export default router;