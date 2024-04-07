// pages/api/mechanics/availability.js

import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import { authorize } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      authorize(req, res, async () => {
        const user = req["user"];

        // Validate user ID
        if (!user?.id) {
          return res.status(400).json({ message: "User ID is required" });
        }

        // Find mechanic by user ID
        const mechanic = await MechanicRegistrationModel.findOne({
          user: user.id,
        });

        if (!mechanic) {
          return res.status(404).json({ message: "Mechanic not found" });
        }

        // Update the availability for the mechanic
        mechanic.availability = req.body.availability;
        await mechanic.save();

        res.status(200).json({ message: "Availability updated successfully" });
      });
    } catch (error) {
      console.error("Error updating availability:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
