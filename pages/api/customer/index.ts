// pages/api/customer.js

import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../lib/models/user"; // Ensure correct path
import { MongoDBConnector } from "lib/database";
import { authorize } from "lib/auth";

export default async function handler(req, res) {
  try {
    // Authorize the user
    await authorize(req, res, async () => {
      const dbConnector = new MongoDBConnector();
      const user = req["user"]; // Extract user object from middleware

      if (!user || !user.id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Find user by ID
      const foundUser = await UserModel.findById(user.id);

      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.method === "GET") {
        // Return user data
        return res.status(200).json({ user: foundUser });
      } else if (req.method === "PUT") {
        // Update user data
        const { name, phoneNumber, alternate } = req.body;

        // Validate required fields
        if (!name || !phoneNumber) {
          return res.status(400).json({ message: "Name and Phone Number are required" });
        }

        // Update fields (email is excluded)
        foundUser.name = name;
        foundUser.phoneNumber = phoneNumber;

        await foundUser.save();

        return res.status(200).json({ message: "Profile updated successfully", user: foundUser });
      } else {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    });
  } catch (error) {
    console.error("Error handling customer API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
