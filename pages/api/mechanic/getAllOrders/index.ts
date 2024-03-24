import { authorize } from "@/lib/auth";
import { MongoDBConnector } from "@/lib/database";
import { BookingModel } from "@/lib/models/booking/booking";
import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbConnector = new MongoDBConnector();
  try {
    authorize(req, res, async () => {
      const user = req["user"]; // Extract user ID from the authorization middleware
      const userId = user.id;
      console.log("UserId", userId);

      // Find the mechanic ID based on the user ID
      const mechanic = await MechanicRegistrationModel.findOne({
        user: userId,
      });

      console.log("mechanic", mechanic);

      if (!mechanic) {
        // Mechanic not found for the given user ID
        return res.status(404).json({ message: "Mechanic not found" });
      }

      // Extract the mechanic ID
      const mechanicId = mechanic._id;

      // Find all bookings associated with the mechanic ID
      const bookings = await BookingModel.find({ mechanic: mechanicId });

      res.status(200).json({ bookings });
    });
  } catch (error) {
    console.error("Error fetching mechanic bookings:", error);

    if (error.name === "UnauthorizedError") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Handle other errors
    res.status(500).json({ message: "Internal Server Error" });
  }
}
