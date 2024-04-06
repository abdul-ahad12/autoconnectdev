import { authorize } from "@/lib/auth";
import { CustomOrderModel } from "@/lib/models/customOrder.ts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Call the authorize middleware to extract user ID from token
      authorize(req, res, async () => {
        const { orderId, price, availableDate } = req.body;
        const user = req["user"]; // Extract user ID from the authorization middleware
        const mechanicId = user.id;

        // Validate required fields
        if (!orderId || !price || !availableDate) {
          return res
            .status(400)
            .json({
              message: "Order ID, price, and available date are required",
            });
        }

        // Find the custom order by ID
        const customOrder = await CustomOrderModel.findById(orderId);

        if (!customOrder) {
          return res.status(404).json({ message: "Custom order not found" });
        }

        // Add mechanic's offer to the custom order
        customOrder.mechanicOffers.push({
          mechanic: mechanicId,
          price,
          availableDate,
        });
        await customOrder.save();

        res
          .status(200)
          .json({
            message: "Price and availability date submitted successfully",
          });
      });
    } catch (error) {
      console.error("Error submitting price and availability date:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
