// pages/api/mechanics/search.js

import { NextApiRequest, NextApiResponse } from "next";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { location, services, vehicleType, page: rawPage, limit: rawLimit } = req.query;
    const page = parseInt(rawPage as string) || 1; // Ensure page is a number, default to 1 if not provided
    const limit = parseInt(rawLimit as string) || 10; // Ensure limit is a number, default to 10 if not provided

    // Parse services query parameter into an array if provided
    const servicesArray = typeof services === 'string' ? [services] : services;

    // Define the query criteria
    const query: any = {
      services: { $all: servicesArray },
      'vehicleType': vehicleType
    };

    // Find mechanics based on the query criteria
    const mechanics = await MechanicRegistrationModel
      .find()
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records per page

    res.status(200).json({ mechanics });
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
