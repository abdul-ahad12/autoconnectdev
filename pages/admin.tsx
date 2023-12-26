import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "../lib/auth";
import { UserRoles } from "../lib/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  next
) {
  try {
    authorize(req, res, next, [UserRoles.ADMIN]);
    res.status(200).json({ message: "You are an admin" });
    return <div>Admin Dashboard</div>;
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
