import { Request, Response } from "express";
import { User } from "../models/User";
import { Job } from "../models/Job";

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const jobs = await Job.find();

    const employers = users.filter(user => user.role === "employer");
    const employees = users.filter(user => user.role === "employee");

    res.json({
      totalUsers: users.length,
      totalJobs: jobs.length,
      employers: employers.length,
      employees: employees.length,
    });

  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};