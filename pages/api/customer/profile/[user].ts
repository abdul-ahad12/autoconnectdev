// pages/api/customers/[userId]/profile.js

import { UserModel } from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
