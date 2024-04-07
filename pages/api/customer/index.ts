import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../lib/models/user";
import { authorize } from "lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    authorize(req, res, async () => {
      const userId = req["user"];
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      console.log(`Fetching user with id: ${userId.id}`);
      const user = await UserModel.findById(userId.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
