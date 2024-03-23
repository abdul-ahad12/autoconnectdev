import { UserModel } from "lib/models/user";


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { page = 1, limit = 10 } = req.query;

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skippedDocuments = (pageNumber - 1) * limitNumber;

    const users = await UserModel.find()
      .skip(skippedDocuments)
      .limit(limitNumber)
      .exec();

    const totalCount = await UserModel.countDocuments();

    res.status(200).json({
      users,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
