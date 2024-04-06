import Service from "@/lib/models/services";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name } = req.body;

    try {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      res.status(200).json({ service: updatedService });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await Service.findByIdAndDelete(id);
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
