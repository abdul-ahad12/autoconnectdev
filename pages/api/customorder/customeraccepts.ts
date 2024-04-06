import { authorize } from "@/lib/auth";
import { CustomOrderModel } from "@/lib/models/customOrder.ts";
import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Call the authorize middleware to extract user ID from token
      authorize(req, res, async () => {
        const { orderId, mechanicUserId } = req.body;
        const user = req["user"]; // Extract user ID from the authorization middleware
        const userId = user.id;

        // Validate required fields
        if (!orderId || !mechanicUserId) {
          return res
            .status(400)
            .json({ message: "Order ID and mechanic user ID are required" });
        }

        // Find the custom order by ID
        const customOrder = await CustomOrderModel.findById(orderId);

        if (!customOrder) {
          return res.status(404).json({ message: "Custom order not found" });
        }

        // Check if the user is the owner of the custom order
        if (customOrder.user.toString() !== userId) {
          return res
            .status(403)
            .json({ message: "You are not authorized to accept this booking" });
        }

        // Find the mechanic by user ID
        const mechanic = await MechanicRegistrationModel.findOne({
          user: mechanicUserId,
        });

        if (!mechanic) {
          return res
            .status(404)
            .json({ message: "Mechanic not found for the provided user ID" });
        }

        // Update the custom order to mark it as accepted and select the mechanic
        customOrder.accepted = true;
        customOrder.selectedMechanic = mechanic._id;
        await customOrder.save();

        return res
          .status(200)
          .json({ message: "Custom booking accepted successfully" });
      });
    } catch (error) {
      console.error("Error accepting custom booking:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
