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
			return res.status(400).json({ message: "Email and password are required" });
		}

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, existingUser.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const secret = process.env.JWT_SECRET as Secret;
		if (!secret) {
			console.error("JWT_SECRET is not defined in environment variables");
			return res.status(500).json({ message: "Internal server error" });
		}

		const token = jwt.sign(
			{
				id: existingUser._id,
				role: existingUser.role,
			},
			secret,
			{ expiresIn: "1d" },
		);

		res.json({
			token,
			user: {
				id: existingUser._id,
				name: existingUser.name,
				email: existingUser.email,
				role: existingUser.role,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};


export const logout = () => {
	
}