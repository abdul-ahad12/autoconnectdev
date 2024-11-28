// pages/api/mechanics/services/[serviceId].js

import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import { authorize } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  const { serviceId } = req.query;

  if (!serviceId || typeof serviceId !== "string") {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  try {
    // Authorize the user
    await authorize(req, res, async () => {
      const user = req["user"];
      const userId = user.id;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Find mechanic by user ID
      const mechanic = await MechanicRegistrationModel.findOne({ user: userId });

      if (!mechanic) {
        return res.status(404).json({ message: "Mechanic not found" });
      }

      // Find the specific service by its _id
      const service = mechanic.services.id(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      if (req.method === "PUT") {
        // Update service price
        const { price } = req.body;

        if (price === undefined) {
          return res.status(400).json({ message: "Price is required" });
        }

        service.price = price;
        await mechanic.save();

        return res.status(200).json({ message: "Service updated successfully", service });
      } else if (req.method === "DELETE") {
        // Delete the service
        service.remove();
        await mechanic.save();

        return res.status(200).json({ message: "Service deleted successfully" });
      } else {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    });
  } catch (error) {
    console.error("Error handling individual service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
