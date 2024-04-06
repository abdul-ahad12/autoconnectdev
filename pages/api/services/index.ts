import Service from "@/lib/models/services";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const services = await Service
      .find();
      res.status(200).json({ services });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    const { name } = req.body;
  
    try {
      const service = new Service({ name });
      await service.save();
      res.status(201).json({ service });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
