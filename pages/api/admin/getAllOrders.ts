import { BookingModel } from "lib/models/booking/booking";


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { page = 1, limit = 10 } = req.query;

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skippedDocuments = (pageNumber - 1) * limitNumber;

    const orders = await BookingModel.find()
      .skip(skippedDocuments)
      .limit(limitNumber)
      .exec();

    const totalCount = await BookingModel.countDocuments();

    res.status(200).json({
      orders,
      totalCount
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
