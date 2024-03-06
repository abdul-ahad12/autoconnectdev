// pages/api/bookings/create.js

import { BookingModel } from "@/lib/models/booking/booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        userId,
        mechanicId,
        timeSlots,
        deliveryMode,
        services,
        address,
        customNote,
      } = req.body;

      console.log(req.body)

      // Validate required fields
      if (
        !userId ||
        !mechanicId ||
        !timeSlots ||
        !deliveryMode ||
        !services ||
        !address
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Create a new booking
      const newBooking = await BookingModel.create({
        user: userId,
        mechanic: mechanicId,
        timeSlots: timeSlots,
        deliveryMode: deliveryMode,
        services: services,
        isCompleted: false, // Default isCompleted value
        address: address,
        customNote: customNote,
      });

      res
        .status(201)
        .json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
