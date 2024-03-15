import { NextApiRequest, NextApiResponse } from "next";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      location,
      services,
      deliveryMode,
      page: rawPage,
      limit: rawLimit,
    } = req.query;

 console.log(req.query)
    // Parse query parameters
    const city = location;
    const page = parseInt(rawPage as string) || 1;
    const limit = parseInt(rawLimit as string) || 10;

    // Set default delivery mode to "TO_MECHANIC" if not provided
    const defaultDeliveryMode = "TO_MECHANIC";

    // Convert deliveryMode to an array if it's a single value
    const deliveryModes = Array.isArray(deliveryMode)
      ? deliveryMode
      : [deliveryMode || defaultDeliveryMode];

    // Define the query criteria
    const query: any = {};

    // Add services criteria if provided
    if (services) {
      query.services = {
        $elemMatch: {
          name: { $in: Array.isArray(services) ? services : [services] },
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
      query.deliveryMode = defaultDeliveryMode;
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
