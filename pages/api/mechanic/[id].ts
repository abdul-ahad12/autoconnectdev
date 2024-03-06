import { NextApiRequest, NextApiResponse } from "next";
import { MechanicRegistrationModel } from "../../../lib/models/mechanic/registration";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Mechanic ID is required" });
    }

    // Find mechanic by ID
    const mechanic = await MechanicRegistrationModel.findById(id);

    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    res.status(200).json({ mechanic });
  } catch (error) {
    console.error("Error fetching mechanic:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
