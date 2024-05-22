// pages/api/mechanics/details.js

import { authorize } from "lib/auth";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Call the authorize middleware to extract user ID from token
      authorize(req, res, async () => {
        const user = req["user"];

        // Validate user ID
        if (!user?.id) {
          return res.status(400).json({ message: "User ID is required" });
        }

        // Find mechanic by ID
        const mechanic = await MechanicRegistrationModel.findById(user.id);
        if (!mechanic) {
          return res.status(404).json({ message: "Mechanic not found" });
        }

        res.status(200).json({ mechanic });
      });
    } catch (error) {
      console.error("Error fetching mechanic details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
