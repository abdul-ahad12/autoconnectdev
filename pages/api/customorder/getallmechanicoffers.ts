import { CustomOrderModel } from "@/lib/models/customOrder.ts";
import { authorize } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Call the authorize middleware to extract user ID from token
      authorize(req, res, async () => {
        const user = req["user"]; // Extract user ID from the authorization middleware
        // Extract user ID from the authorization middleware
        const userId = user.id;

        // Find all custom orders for the given userId that are not accepted
        const customOrders = await CustomOrderModel.find({
          user: userId,
          accepted: false,
        });

        return res.status(200).json({ customOrders });
      });
    } catch (error) {
      console.error("Error getting custom orders:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
