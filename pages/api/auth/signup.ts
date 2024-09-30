import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { User, UserModel } from "../../../lib/models/user";
import bcrypt from "bcrypt";
import dotevn from "dotenv";
import { issueToken } from "../../../lib/auth";
import { setTokensCookies } from "../../../lib/cookie";
dotevn.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbConnector = new MongoDBConnector();
  
  const user: User = req.body;
  const userAlreaduExists = await dbConnector.find(UserModel, {
    email: user.email,
  });
  if (userAlreaduExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const password = user.password;
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  const result = await UserModel.create(user);
  
  const { accessToken, refreshToken } = issueToken({
    id: result._id,
    role: result.role,
  });

  setTokensCookies(res, accessToken, refreshToken);
  res.status(200).json({ accessToken, refreshToken, user: result });
}
