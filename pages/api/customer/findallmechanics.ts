import { NextApiRequest, NextApiResponse } from "next";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const {
      location: city,
      services: rawServices,
      deliveryMode,
      page: rawPage,
      limit: rawLimit,
    } = req.query;

    // Parse services into an array if it's a string with commas
    const services = Array.isArray(rawServices)
      ? rawServices
      : rawServices.split(",").map((service) => service.trim());

    // Parse query parameters
    const page = parseInt(rawPage as string) || DEFAULT_PAGE;
    const limit = parseInt(rawLimit as string) || DEFAULT_LIMIT;

    // Convert deliveryMode to an array if it's a single value
    const deliveryModes = Array.isArray(deliveryMode)
      ? deliveryMode
      : [deliveryMode || DEFAULT_DELIVERY_MODE];

    // Define the query criteria
    const query: any = {};

    // Add services criteria if provided
    if (services.length > 0) {
      query.services = {
        $elemMatch: {
          name: { $in: services },
        },
      };
    }

    // Add city criteria if provided
    if (city) {
      query["address.state"] = city;
    }

    // Add delivery mode criteria
    if (deliveryModes.length > 0) {
      query.deliveryMode = { $in: deliveryModes };
    } else {
      // Default behavior: Show mechanics with TO_MECHANIC delivery mode if no delivery mode is specified
      query.deliveryMode = DEFAULT_DELIVERY_MODE;
    }

    // Find mechanics based on the query criteria
    const mechanics = await MechanicRegistrationModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ mechanics });
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
