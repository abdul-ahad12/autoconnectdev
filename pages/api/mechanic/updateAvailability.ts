// pages/api/mechanics/updateAvailability.js

import { NextApiRequest, NextApiResponse } from "next";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";
import { MongoDBConnector } from "@/lib/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbConnector = new MongoDBConnector(); // Use the same MongoDBConnector
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { mechanicId, availability } = req.body;

  try {
    // Find the mechanic by ID using the MongoDBConnector
    const mechanic = await dbConnector.findById(
      MechanicRegistrationModel,
      mechanicId
    );
    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    // Update the availability
    mechanic.availability = availability;

    // Save the updated mechanic
    await mechanic.save();

    return res
      .status(200)
      .json({ message: "Availability updated successfully", mechanic });
  } catch (error) {
    console.error("Error updating mechanic availability:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
