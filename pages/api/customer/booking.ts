import { authorize } from "lib/auth";
import { BookingModel } from "lib/models/booking/booking";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomQuery extends Record<string, string | string[]> {
  page?: string;
  limit?: string;
  filter?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Call the authorize middleware to extract user ID from token
    authorize(req, res, async () => {
      // Extract userId from the request object after authorization
      const userId = req["user"];
      console.log("USER ID",userId.id)

      const {
        page = "1",
        limit = "10",
        filter = "all",
      } = req.query as CustomQuery;

      let query: Record<string, any> = { user: userId.id };
      if (filter === "previous") {
        query.date = { $lt: new Date() }; // Filter for previous bookings
      } else if (filter === "upcoming") {
        query.date = { $gte: new Date() }; // Filter for upcoming bookings
      }

      const bookings = await BookingModel.find(query)
        .sort({ date: -1 }) // Sort by date in descending order
        .skip((parseInt(page) - 1) * parseInt(limit)) // Skip records based on pagination
        .limit(parseInt(limit)); // Limit the number of records per page

      res.status(200).json({ bookings });
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
