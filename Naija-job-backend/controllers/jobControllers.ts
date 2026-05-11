import { Request, Response } from "express";
import { Job } from "../models/Job.js";
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";

export const postJob = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can create jobs" });
    }

    const { title, company, jobType, category, location, duration, skills, salary, description, workImages } = req.body;

    if (!title || !company || !category || !location || !salary || !duration) {
      return res.status(400).json({
        message: "Title, company, category, location, duration, and salary are required",
      });
    }

    const cleanWorkImages = Array.isArray(workImages)
      ? workImages.map((image: string) => image.trim()).filter(Boolean)
      : [];

    if (cleanWorkImages.length === 0) {
      return res.status(400).json({
        message: "At least one image of the work is required",
      });
    }

    const job = await Job.create({
      title,
      company,
      jobType,
      category,
      location,
      duration,
      skills,
      salary,
      description,
      workImages: cleanWorkImages,
      createdBy: req.user._id,
    });

    // Notify all admins that a new job was posted
    const admins = await User.find({ role: "admin" }).select("_id");

    if (admins.length > 0) {
      const notifications = admins.map((admin) => ({
        recipient: admin._id,
        sender: req.user!._id,
        job: job._id,
        type: "new_job_posted" as const,
        message: `${req.user!.name} posted a new job: "${title}" at ${company}`,
      }));

      await Notification.insertMany(notifications);
    }

    res.status(201).json(job);
  } catch (error) {
    console.error("Post job error:", error);
    res.status(500).json({ message: "Failed to create job listing" });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let jobs;

    if (req.user.role === "employer") {
      jobs = await Job.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    } else {
      jobs = await Job.find().sort({ createdAt: -1 });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Get single job error:", error);
    res.status(500).json({ message: "Failed to fetch job details" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const isOwner = job.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};
