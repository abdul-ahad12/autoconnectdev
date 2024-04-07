import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../../lib/models/user";
import { MongoDBConnector } from "../../../lib/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse cookies from the request object
    const { cookies } = req;

    // Extract the access token from cookies
    const refreshToken = cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(401).json({ message: "Access token not found" });
    }

    // Verify and decode the access token
    const decodedToken = jwt.verify(refreshToken, process.env.SECRET_TOKEN) as JwtPayload;

    if (!decodedToken || typeof decodedToken === 'string') {
      return res.status(401).json({ message: "Invalid access token" });
    }

    // Retrieve user details from the database using the decoded user ID
    const dbConnector = new MongoDBConnector();
    const user = await dbConnector.findById(UserModel, decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details in the response
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
