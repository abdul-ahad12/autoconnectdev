// pages/api/mechanics/bookings.js

import { MongoDBConnector } from "@/lib/database";
import { BookingModel } from "@/lib/models/booking/booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const dbConnector = new MongoDBConnector();
  try {
    const mechanicId = req.query.mechanicId;

    // Find all bookings associated with the mechanic ID
    const bookings = await BookingModel.find({ mechanic: mechanicId });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching mechanic bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
