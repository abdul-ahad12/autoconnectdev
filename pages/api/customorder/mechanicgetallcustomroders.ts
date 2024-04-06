import { CustomOrderModel } from "@/lib/models/customOrder.ts";
import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import { authorize } from "lib/auth"; // Import MechanicRegistrationModel
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      authorize(req, res, async () => {
        const user = req["user"];
        const userId = user.id;

        const mechanic = await MechanicRegistrationModel.findOne({
          user: userId,
        });

        if (mechanic) {
          const customOrders = await CustomOrderModel.find({
            suburb: mechanic.address.suburb,
            "mechanicOffers.mechanic": { $ne: userId }, // Exclude custom orders where mechanic is already present in mechanicOffers
          });

          return res.status(200).json({ customOrders });
        } else {
          return res
            .status(404)
            .json({ message: "Mechanic not found for the user" });
        }
      });
    } catch (error) {
      console.error("Error getting custom orders:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
