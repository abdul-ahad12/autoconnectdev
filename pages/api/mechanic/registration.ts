// pages/api/mechanics/register.js

import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { UserModel } from "../../../lib/models/user";
import {
  ApprovalStatus,
  MechanicRegistrationModel,
} from "@/lib/models/mechanic/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbConnector = new MongoDBConnector();
  const {
    user,
    address,
    googleMapsLocation,
    abn,
    availability,
    services,
    aboutus,
    name,
  } = req.body;

  console.log(user);
  try {
    // Check if the user exists
    const userFromDb = await dbConnector.findById(UserModel, user);
    if (!userFromDb) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the user is already registered as a mechanic
    const existingRegistration = await dbConnector.find(
      MechanicRegistrationModel,
      { user: userFromDb }
    );
    if (existingRegistration) {
      res.status(400).json({ message: "Mechanic registration already exists" });
      return;
    }

    // Create a new MechanicRegistration document
    const mechanicRegistration = new MechanicRegistrationModel({
      user: userFromDb,
      name,
      aboutus,
      address,
      googleMapsLocation,
      abn,
      approvalStatus: ApprovalStatus.PENDING,
      availability,
      services,
    });

    // Save the MechanicRegistration document
    await mechanicRegistration.save();

    res
      .status(201)
      .json({
        message: "Mechanic registration details submitted successfully.",
      });
  } catch (error) {
    console.error("Error during mechanic registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
