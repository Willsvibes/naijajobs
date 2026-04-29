import { User } from "../models/User";
import {Request, Response} from "express"

export const getProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const updateProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.id;

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
