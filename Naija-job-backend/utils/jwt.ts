// write utils for jwt signing and verifying access and refresh token with their secret 
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessSecret = process.env.JWT_SECRET as Secret;
const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;

if (!accessSecret || !refreshSecret) {
    throw new Error("JWT secrets missing");
}


export const signAccessToken = (payload: any) => {
    return jwt.sign(payload, accessSecret, {
        expiresIn: "15m",
    });
};

export const signRefreshToken = (payload: any) => {
    return jwt.sign(payload, refreshSecret, {
        expiresIn: "7d",
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessSecret);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshSecret);
};
