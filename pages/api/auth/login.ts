// pages/api/auth/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { User, UserModel } from "../../../lib/models/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { issueToken } from "../../../lib/auth";
import { setCookie, setTokensCookies } from "../../../lib/cookie";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbConnector = new MongoDBConnector();
  const user: User = req.body;

  try {
    // Fetch the user by email
    const userAlreadyExists = await dbConnector.find(UserModel, {
      email: user.email,
    });


    // If user does not exist
    if (!userAlreadyExists || userAlreadyExists.length === 0) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }

    const existingUser = userAlreadyExists[0];



    // Check if the user is banned
    if (existingUser.ban) {
      res.status(403).json({ message: "Your account has been banned." });
      return;
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(
      user.password,
      existingUser.password,
      function (err, result) {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(400).json({ message: "Error processing request." });
          return;
        }
        if (result) {
          // Passwords match, issue tokens
          const { accessToken, refreshToken } = issueToken({
            id: existingUser._id,
            role: existingUser.role,
          });

          // Set cookies
          setCookie(res, "access-token", accessToken, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
          });
          setCookie(res, "refresh-token", refreshToken, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
          });

          // Optionally, set tokens in other ways if needed
          setTokensCookies(res, accessToken, refreshToken);

          // Respond with tokens and user data (excluding password)
          const { password, ...userData } = existingUser.toObject();

          res.status(200).json({ accessToken, refreshToken, user: userData });
        } else {
          // Passwords do not match
          res.status(400).json({ message: "Wrong password" });
          return;
        }
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
