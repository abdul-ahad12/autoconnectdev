import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { UserModel, UserRoles } from "../../../lib/models/user";

import { authorize } from "../../../lib/auth"; // Import the authorization middleware
import {
  ApprovalStatus,
  MechanicRegistrationModel,
} from "lib/models/mechanic/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Call the authorize middleware to extract user ID from token
    authorize(req, res, async () => {
      const dbConnector = new MongoDBConnector();
      const user = req["user"]; // Extract user ID from the authorization middleware

      const {
        address,
        googleMapsLocation,
        australianBusinessNumber,
        availability,
        services,
        aboutUs,
        name,
        deliveryMode,
      } = req.body;

      // Check if the user exists
      const userFromDb = await dbConnector.findById(UserModel, user.id);
      if (!userFromDb) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Check if the user is already registered as a mechanic
      const existingRegistration = await dbConnector.find(
        MechanicRegistrationModel,
        { user: user.id }
      );
      if (existingRegistration) {
        res
          .status(400)
          .json({ message: "Mechanic registration already exists" });
        return;
      }

      // Create a new MechanicRegistration document
      const mechanicRegistration = new MechanicRegistrationModel({
        user: user.id, // Use the extracted user ID
        name,
        aboutUs,
        address,
        googleMapsLocation,
        australianBusinessNumber,
        approvalStatus: ApprovalStatus.PENDING,
        availability,
        services,
        deliveryMode,
      });

      // Save the MechanicRegistration document
      const registeredMechanic = await mechanicRegistration.save();
      console.log(registeredMechanic);

      // Update user role to MECHANIC
      userFromDb.role = UserRoles.MECHANIC;
      await userFromDb.save(); // Save the updated user

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
