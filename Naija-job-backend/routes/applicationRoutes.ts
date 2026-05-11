
import { configDotenv } from "dotenv";
import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import {
  applyToJob,
  getApplicationsForJob,
  getMyApplications,
  getReceivedOffers,
  updateApplicationStatus,
} from "../controllers/applicationControllers";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/applicationControllers";

export const applicationRouter = Router();
configDotenv()
// Applications
applicationRouter.post("/:jobId", authMiddleware, applyToJob);
applicationRouter.get("/received", authMiddleware, getReceivedOffers);
applicationRouter.get("/job/:jobId", authMiddleware, getApplicationsForJob);
applicationRouter.get("/me", authMiddleware, getMyApplications);
applicationRouter.patch("/:applicationId/status", authMiddleware, updateApplicationStatus);


export const notificationRouter = Router();
// Notifications
notificationRouter.get("/", authMiddleware, getNotifications);
notificationRouter.patch("/read-all", authMiddleware, markAllNotificationsRead);
notificationRouter.patch("/:notificationId/read", authMiddleware, markNotificationRead);

export default { applicationRouter, notificationRouter };
