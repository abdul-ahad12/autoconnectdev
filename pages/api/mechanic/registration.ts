// pages/api/mechanics/register.js

import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { UserModel, UserRoles } from "../../../lib/models/user";
import { ApprovalStatus, MechanicRegistrationModel } from "@/lib/models/mechanic/registration";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbConnector = new MongoDBConnector();
  const { userId, city, postalCode, googleMapsLocation, abn } = req.body;

  try {
    // Check if the user exists
    const user = await dbConnector.findById(UserModel, userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the user is already registered as a mechanic
    const existingRegistration = await dbConnector.find(MechanicRegistrationModel, { user: userId });
    if (existingRegistration) {
      res.status(400).json({ message: "Mechanic registration already exists" });
      return;
    }

    // Create a new MechanicRegistration document
    const mechanicRegistration = new MechanicRegistrationModel({
      user: userId,
      address: {
        city,
        postalCode,
      },
      googleMapsLocation,
      abn,
      approvalStatus: ApprovalStatus.PENDING,
    });

    // Save the MechanicRegistration document
    await mechanicRegistration.save();

    res.status(201).json({ message: "Mechanic registration details submitted successfully." });
  } catch (error) {
    console.error("Error during mechanic registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
