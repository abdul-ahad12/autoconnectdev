// pages/api/customers/[userId]/profile.js

import { UserModel } from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    // Extract updated profile details from the request body
    const { name, email } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's name and email (phone number cannot be changed)
    user.name = name;
    user.email = email;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
