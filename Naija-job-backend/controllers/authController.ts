import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role } = req.body;

		// Input validation
		if (!name || !email || !password) {
			return res.status(400).json({
				message: "Name, email, and password are required",
			});
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || "employee",
		});

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
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const accessSecret = process.env.JWT_SECRET as Secret;
    const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;

    if (!accessSecret || !refreshSecret) {
      return res.status(500).json({
        message: "JWT secrets missing",
      });
    }

    //  ACCESS TOKEN
    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
      accessSecret,
      { expiresIn: "15m" }
    );

    //  REFRESH TOKEN
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      refreshSecret,
      { expiresIn: "7d" }
    );

    //  SAVE TO DB
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    // SET COOKIE (secure)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //  SEND ACCESS TOKEN ONLY
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

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
) => {
  try {
    //  GET TOKEN FROM COOKIE
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided",
      });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
    const accessSecret = process.env.JWT_SECRET as Secret;

    if (!refreshSecret || !accessSecret) {
      return res.status(500).json({
        message: "JWT secrets missing",
      });
    }

    //  VERIFY TOKEN
    const decoded = jwt.verify(refreshToken, refreshSecret) as {
      id: string;
    };

    //  FIND USER
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    //  ROTATE REFRESH TOKEN
    const newRefreshToken = jwt.sign(
      { id: user._id },
      refreshSecret,
      { expiresIn: "7d" }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    //  NEW ACCESS TOKEN
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      accessSecret,
      { expiresIn: "15m" }
    );

    //  SET NEW COOKIE
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(403).json({
      message: "Invalid or expired refresh token",
    });
  }
};

export const logout = () => {
	
}