import { Request, Response } from "express";
import { Job } from "../models/Job";

export const postJob = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can create jobs" });
    }

    const { title, company, jobType, category, location, duration, skills, salary, description } = req.body;

    // Validate required fields
    if (!title || !company || !category || !location || !salary) {
      return res.status(400).json({ message: "Title, company, category, location, and salary are required" });
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
      createdBy: req.user._id,
    });

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
      // Employers see only their own listings
      jobs = await Job.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    } else {
      // Employees see all available jobs
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