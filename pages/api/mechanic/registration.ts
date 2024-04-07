import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { UserModel, UserRoles } from "../../../lib/models/user";

import { authorize } from "../../../lib/auth";
import {
  ApprovalStatus,
  MechanicRegistrationModel,
} from "lib/models/mechanic/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    authorize(req, res, async () => {
      const dbConnector = new MongoDBConnector();
      const user = req["user"];

      const {
        address,
        googleMapsLocation,
        abn,
        availability,
        services,
        aboutus,
        name,
        deliveryMode,
      } = req.body;

      // Check if the user exists
      const existingUser = await dbConnector.findById(UserModel, user.id);
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Check if the user is already registered as a mechanic
      const existingMechanic = await dbConnector.findById(MechanicRegistrationModel, user.id);
      if (existingMechanic) {
        res
          .status(400)
          .json({ message: "Mechanic registration already exists" });
        return;
      }

      // Create a new MechanicRegistration document
      const mechanicRegistration = new MechanicRegistrationModel({
        user: user.id, // Use the extracted user ID
        name,
        aboutus,
        address,
        googleMapsLocation,
        abn,
        approvalStatus: ApprovalStatus.PENDING,
        availability,
        services,
        deliveryMode,
      });

      // Save the MechanicRegistration document
      const registeredMechanic = await mechanicRegistration.save();
      console.log(`Mechanic registration details saved: ${registeredMechanic}`);

      // Update user role to MECHANIC
      existingUser.role = UserRoles.MECHANIC;
      await existingUser.save(); // Save the updated user

      res.status(201).json({
        message: "Mechanic registration details submitted successfully.",
        id: registeredMechanic._id,
      });
    });
  } catch (error) {
    console.error("Error during mechanic registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
