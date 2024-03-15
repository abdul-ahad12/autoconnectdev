// pages/api/stats.js

import { BookingModel } from "lib/models/booking/booking";
import { MechanicRegistrationModel } from "lib/models/mechanic/registration";
import { UserModel } from "lib/models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const totalUsers = await UserModel.countDocuments();
    const totalMechanics = await MechanicRegistrationModel.countDocuments();
    const totalBookings = await BookingModel.countDocuments();

    res.status(200).json({
      totalUsers,
      totalMechanics,
      totalBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
