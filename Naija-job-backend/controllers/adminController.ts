import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
// import { Notification } from "../models/Notification.js";

// ── GET /admin/stats ─────────────────────────
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const [users, jobs, applications] = await Promise.all([
      User.find(),
      Job.find(),
      Application.countDocuments(),
    ]);

    const employers = users.filter((u) => u.role === "employer");
    const employees = users.filter((u) => u.role === "employee");
    const banned    = users.filter((u) => u.banned);

    res.json({
      totalUsers:    users.length,
      totalJobs:     jobs.length,
      totalApplications: applications,
      employers:     employers.length,
      employees:     employees.length,
      bannedUsers:   banned.length,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ── GET /admin/users ─────────────────────────
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("-password -refreshToken")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ── GET /admin/jobs ──────────────────────────
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ── PATCH /admin/users/:userId/ban ───────────
export const banUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot ban an admin" });
    }

    user.banned = true;
    await user.save();

    res.json({ message: `${user.name} has been banned` });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ── PATCH /admin/users/:userId/unban ─────────
export const unbanUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.banned = false;
    await user.save();

    res.json({ message: `${user.name} has been unbanned` });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ── DELETE /admin/jobs/:jobId ─────────────────
export const adminDeleteJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ── DELETE /admin/users/:userId ───────────────
export const adminDeleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete an admin account" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// GET USER DETAIL
export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch their jobs if they're an employer
    const jobs = user.role === "employer"
      ? await Job.find({ createdBy: userId }).sort({ createdAt: -1 })
      : [];

    // Fetch their applications if they're an employee
    const applications = user.role === "employee"
      ? await Application.find({ applicant: userId })
          .populate("job", "title company location")
          .sort({ createdAt: -1 })
      : [];

    res.json({ user, jobs, applications });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};