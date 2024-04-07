import Service from "@/lib/models/services";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const services = await Service.find();
      res.status(200).json({ services });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      // Delete all services from the database
      await Service.deleteMany({});

      // Get the array of service names from the request body
      const serviceNames = req.body;

      // Add each service name to the database
      for (const name of serviceNames) {
        await Service.create({ name });
      }

      // Send a success response
      res.status(200).json({ message: "Services updated successfully" });
    } catch (error) {
      // Send an error response if something goes wrong
      console.error("Error updating services:", error);
      res.status(500).json({ message: "Error updating services" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
