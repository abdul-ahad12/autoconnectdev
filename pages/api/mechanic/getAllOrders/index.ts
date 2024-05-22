import { authorize } from "@/lib/auth";
import { MongoDBConnector } from "@/lib/database";
import { BookingModel } from "@/lib/models/booking/booking";
import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    authorize(req, res, async () => {
      const user = req["user"];

      // Find the mechanic ID based on the user ID
      const mechanic = await MechanicRegistrationModel.findOne({
        user: user.id,
      }, { _id: 1 });

      if (!mechanic) {
        // Mechanic not found for the given user ID
        return res.status(404).json({ message: "Mechanic not found" });
      }

      console.log(`Fetching bookings for mechanic: ${mechanic._id}`);
      // Find all bookings associated with the mechanic ID
      const bookings = await BookingModel.find({ mechanic: mechanic._id });

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
