import { login, register } from "../controllers/authController";
import { configDotenv } from "dotenv";
import { Router } from "express";

export const authRouter = Router()
configDotenv()

authRouter.post("/register", register); 

authRouter.post("/login", login)