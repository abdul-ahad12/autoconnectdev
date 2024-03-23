import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../lib/models/user"; // Assuming the path to the user model is correct
import { MongoDBConnector } from "lib/database";
import { authorize } from "lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    authorize(req, res, async () => {
      const dbConnector = new MongoDBConnector();
      const userId = req["user"]; // Extract user ID from the authorization middleware

      console.log("USERID:", userId);
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Find user by ID
      const user = await UserModel.findById(userId.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
