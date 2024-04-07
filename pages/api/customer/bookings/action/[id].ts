import { authorize } from "lib/auth";
import { BookingModel } from "lib/models/booking/booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.query.action === "cancel") {
      authorize(req, res, async () => {
        const { id } = req.query;

        console.log(`Fetching booking with ID: ${id}`);
        // Find the booking by ID
        const booking = await BookingModel.findById(id);
        // Check if the booking exists
        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }

        // Check if the booking is already cancelled
        if (booking.isCancelled) {
          return res
            .status(400)
            .json({ message: "Booking is already cancelled" });
        }

        // Mark booking as cancelled
        booking.isCancelled = true;

        // Save the updated booking
        await booking.save();
        return res.json({ message: "Booking cancelled successfully" });
      });
    }
    if (req.query.action === "complete") {
      const { id } = req.query;

      console.log(`Fetching booking with ID: ${id}`);
      // Find the booking by ID
      const booking = await BookingModel.findById(id);

      // Check if the booking exists
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Mark booking as completed
      booking.isCompleted = true;

      // Save the updated booking
      await booking.save();

      res.status(200).json({
        message: "Succesfully booking completed"
      })
    }
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
