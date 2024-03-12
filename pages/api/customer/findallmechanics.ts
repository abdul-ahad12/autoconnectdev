import { NextApiRequest, NextApiResponse } from "next";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      city,
      postalCode,
      // suburb,
      services,
      deliveryMode, // Updated for array
      page: rawPage,
      limit: rawLimit,
    } = req.query;
    const page = parseInt(rawPage as string) || 1; // Ensure page is a number, default to 1 if not provided
    const limit = parseInt(rawLimit as string) || 10; // Ensure limit is a number, default to 10 if not provided
    console.log("services:", services);
    // Parse services query parameter into an array if provided
    const servicesArray = typeof services === "string" ? [services] : services;

    // Define the query criteria
    const query: any = {};

    // Add services criteria if provided
    if (servicesArray && servicesArray.length > 0) {
      // Search for mechanics where at least one service offered matches the queried service names
      query.services = { $elemMatch: { name: { $in: servicesArray } } };
    }

    // Add city criteria if provided
    if (city) {
      query["address.city"] = city;
    }

    // Add delivery mode criteria if provided
    if (deliveryMode) {
      query.deliveryMode = {
        $in: Array.isArray(deliveryMode) ? deliveryMode : [deliveryMode],
      };
    }

    // Find mechanics based on the query criteria
    const mechanics = await MechanicRegistrationModel.find(query)
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records per page

    res.status(200).json({ mechanics });
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
