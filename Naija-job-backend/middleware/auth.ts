import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/User";

configDotenv();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET as Secret;

    const decoded = jwt.verify(token, secret) as { id: string };


    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }


    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    res.status(400).json({
      message: "Invalid token",
    });
  }
};