import { CustomOrderModel } from "@/lib/models/customOrder.ts";
import { authorize } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Call the authorize middleware to extract user ID from token
      authorize(req, res, async () => {
        const {
          street,
          city,
          suburb,
          pincode,
          carName,
          manufacturingYear,
          detailedText,
        } = req.body;
        const user = req["user"]; // Extract user ID from the authorization middleware
        // Extract user ID from the authorization middleware
        const userId = user.id;

        // Validate required fields
        if (
          !userId ||
          !street ||
          !city ||
          !suburb ||
          !pincode ||
          !carName ||
          !manufacturingYear ||
          !detailedText
        ) {
          return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new custom order
        const newCustomOrder = await CustomOrderModel.create({
          user: userId,
          street,
          city,
          suburb,
          pincode,
          carName,
          manufacturingYear,
          detailedText,
        });

        res.status(201).json({
          message: "Custom order submitted successfully",
          customOrder: newCustomOrder,
        });
      });
    } catch (error) {
      console.error("Error submitting custom order:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
