import { User } from "../models/User";
import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Only allow updating safe fields (prevent role escalation)
    const { name, email, skills, companyName, bio } = req.body;
    const safeUpdates: Record<string, any> = {};

    if (name) safeUpdates.name = name;
    if (email) safeUpdates.email = email;
    if (bio !== undefined) safeUpdates.bio = bio;

    // Role-specific fields
    if (req.user.role === "employee" && skills) {
      safeUpdates.skills = Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim());
    }
    if (req.user.role === "employer" && companyName) {
      safeUpdates.companyName = companyName;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      safeUpdates,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
