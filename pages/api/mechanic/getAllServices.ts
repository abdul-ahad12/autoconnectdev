import { MechanicRegistrationModel } from "@/lib/models/mechanic/registration";
import Service from "@/lib/models/services";
import { authorize } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      authorize(req, res, async () => {
        const user = req["user"];
        const userId = user.id;

        // Validate user ID
        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        // Get mechanic services
        const mechanic = await MechanicRegistrationModel.findOne({ user: userId });

        if (!mechanic) {
          return res.status(404).json({ message: "Mechanic not found" });
        }

        res.status(200).json({ services: mechanic.services });
      });
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      authorize(req, res, async () => {
        const user = req["user"];
        const userId = user.id;

        // Validate user ID
        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        const { serviceId, price } = req.body;

        if (!serviceId || !price) {
          return res.status(400).json({ message: "Service ID and price are required" });
        }

        const mechanic = await MechanicRegistrationModel.findOne({ user: userId });

        if (!mechanic) {
          return res.status(404).json({ message: "Mechanic not found" });
        }

        const service = await Service.findById(serviceId);

        if (!service) {
          return res.status(404).json({ message: "Service not found" });
        }

        const existingService = mechanic.services.find(
          (s) => s.name === service.name
        );

        if (existingService) {
          return res.status(400).json({ message: "Service already added" });
        }

        mechanic.services.push({ name: service.name, price });
        await mechanic.save();

        res.status(200).json({ message: "Service added successfully", services: mechanic.services });
      });
    } catch (error) {
      console.error("Error adding service:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
