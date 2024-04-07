import { BookingModel } from "lib/models/booking/booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const { orderId } = req.query;

  try {
    const booking = await BookingModel.findById(orderId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
