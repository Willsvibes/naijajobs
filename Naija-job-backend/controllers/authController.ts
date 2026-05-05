import { Request, Response } from "express";
import { User } from "../models/User";
import { Notification } from "../models/Notification";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    // Notify all admins that a new user registered
    const admins = await User.find({ role: "admin" }).select("_id");

    if (admins.length > 0) {
      const notifications = admins.map((admin) => ({
        recipient: admin._id,
        sender: newUser._id,
        type: "new_user_registered" as const,
        message: `New user registered: ${name} (${role || "employee"})`,
      }));

      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessSecret = process.env.JWT_SECRET as Secret;
    const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;

    if (!accessSecret || !refreshSecret) {
      return res.status(500).json({ message: "JWT secrets missing" });
    }

    const accessToken = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      accessSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      refreshSecret,
      { expiresIn: "7d" }
    );

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
    const accessSecret = process.env.JWT_SECRET as Secret;

    if (!refreshSecret || !accessSecret) {
      return res.status(500).json({ message: "JWT secrets missing" });
    }

    const decoded = jwt.verify(refreshToken, refreshSecret) as { id: string };

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newRefreshToken = jwt.sign(
      { id: user._id },
      refreshSecret,
      { expiresIn: "7d" }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      accessSecret,
      { expiresIn: "15m" }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });
      if (user) {
        user.refreshToken = "";
        await user.save();
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};