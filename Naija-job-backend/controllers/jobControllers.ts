import { Request, Response } from "express";
import { Job } from "../models/Job";

export const postJob = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can create jobs" });
    }

    const {
      title,
      company,
      jobType,
      category,
      location,
      duration,
      skills,
      salary,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      jobType,
      category,
      location,
      duration,
      skills,
      salary,
      createdBy: req.user._id, 
    });

    res.status(201).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as Error).message });
  }
};



export const getJobs = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let jobs;

    if (req.user.role === "employer") {
   
      jobs = await Job.find({ createdBy: req.user._id });
    } else {
    
      jobs = await Job.find();
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as Error).message });
  }
};




export const getOne = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};