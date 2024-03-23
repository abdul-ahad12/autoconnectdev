import { MechanicRegistrationModel } from "lib/models/mechanic/registration";

export default async function handler(req, res) {
  const { mechanicId } = req.query;

  try {
    const mechanic = await MechanicRegistrationModel.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }
    res.status(200).json(mechanic);
  } catch (error) {
    console.error("Error fetching mechanic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
