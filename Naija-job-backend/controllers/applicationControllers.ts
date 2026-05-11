import { Request, Response } from "express";
import mongoose from "mongoose";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { Notification } from "../models/Notification.js";

// ─────────────────────────────────────────────
// POST /applications/:jobId
// Employee applies to a job
// ─────────────────────────────────────────────
export const applyToJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Only employees can apply to jobs" });
    }

    const jobIdParam = req.params.jobId as string;
    const { proposal, portfolioImages } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobIdParam)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const jobId = new mongoose.Types.ObjectId(jobIdParam);

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const cleanPortfolioImages = Array.isArray(portfolioImages)
      ? portfolioImages.map((image: string) => image.trim()).filter(Boolean)
      : [];

    if (cleanPortfolioImages.length === 0) {
      return res.status(400).json({ message: "Please add at least one image of your previous work" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: new mongoose.Types.ObjectId(req.user._id as string),
      employer: job.createdBy,
      proposal: proposal || "",
      portfolioImages: cleanPortfolioImages,
    });

    // Notify employer: someone applied to their job
    await Notification.create({
      recipient: job.createdBy,
      sender: new mongoose.Types.ObjectId(req.user._id as string),
      job: jobId,
      application: application._id,
      type: "new_application",
      message: `${req.user.name} applied for "${job.title}"`,
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "You have already applied to this job" });
    }
    console.error("Apply to job error:", error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};

// ─────────────────────────────────────────────
// GET /applications/job/:jobId
// Employer sees all applications for their job
// ─────────────────────────────────────────────
export const getApplicationsForJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "employer" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobId = req.params.jobId as string;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (req.user.role === "employer" && job.createdBy.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to view these applications" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email skills bio")
      .populate("job", "title company location salary jobType workImages")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get applications for job error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

// ─────────────────────────────────────────────
// GET /applications/me
// Employee sees all their own applications
// ─────────────────────────────────────────────
export const getMyApplications = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location salary jobType workImages")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get my applications error:", error);
    res.status(500).json({ message: "Failed to fetch your applications" });
  }
};

export const getReceivedOffers = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "employer" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const filter = req.user.role === "admin" ? {} : { employer: req.user._id };

    const offers = await Application.find(filter)
      .populate("applicant", "name email skills bio")
      .populate("job", "title company location salary jobType category workImages")
      .sort({ createdAt: -1 });

    res.status(200).json(offers);
  } catch (error) {
    console.error("Get received offers error:", error);
    res.status(500).json({ message: "Failed to fetch received offers" });
  }
};

// ─────────────────────────────────────────────
// PATCH /applications/:applicationId/status
// Employer updates application status → notifies employee
// ─────────────────────────────────────────────
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "employer" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applicationId = req.params.applicationId as string;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const validStatuses = ["pending", "reviewed", "accepted", "rejected", "in_progress", "completed", "cancelled"];
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId).populate<{
      job: { _id: mongoose.Types.ObjectId; title: string; createdBy: mongoose.Types.ObjectId };
    }>("job", "title createdBy");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (
      req.user.role === "employer" &&
      application.job.createdBy.toString() !== req.user._id
    ) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    const previousStatus = application.status;
    application.status = status;
    await application.save();

    // Notify the employee their application status changed
    if (previousStatus !== status) {
      const statusMessages: Record<string, string> = {
        reviewed: `Your application for "${application.job.title}" is being reviewed`,
        accepted: `🎉 Congratulations! Your application for "${application.job.title}" has been accepted`,
        rejected: `Your application for "${application.job.title}" was not successful this time`,
        in_progress: `Work has started for "${application.job.title}"`,
        completed: `Your service for "${application.job.title}" has been marked completed`,
        cancelled: `Your service for "${application.job.title}" has been cancelled`,
        pending: `Your application for "${application.job.title}" has been set back to pending`,
      };

      await Notification.create({
        recipient: application.applicant,
        sender: new mongoose.Types.ObjectId(req.user._id as string),
        job: application.job._id,
        application: application._id,
        type: "application_update",
        message: statusMessages[status],
      });
    }

    res.status(200).json({ message: "Status updated", application });
  } catch (error) {
    console.error("Update application status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

// ─────────────────────────────────────────────
// GET /notifications
// ─────────────────────────────────────────────
export const getNotifications = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "name email")
      .populate("job", "title company workImages")
      .populate({
        path: "application",
        select: "proposal portfolioImages status",
        populate: { path: "applicant", select: "name email" },
      })
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// ─────────────────────────────────────────────
// PATCH /notifications/:notificationId/read
// ─────────────────────────────────────────────
export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, recipient: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Marked as read", notification });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// ─────────────────────────────────────────────
// PATCH /notifications/read-all
// ─────────────────────────────────────────────
export const markAllNotificationsRead = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all notifications read error:", error);
    res.status(500).json({ message: "Failed to update notifications" });
  }
};
