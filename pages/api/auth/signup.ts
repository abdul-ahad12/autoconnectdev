import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBConnector } from "../../../lib/database";
import { User, UserModel } from "../../../lib/models/user";
import bcrypt from "bcrypt";
import dotevn from "dotenv";
import { issueToken } from "../../../lib/auth";
import { set } from "mongoose";
import { getCookie, setCookie } from "../../../lib/cookie";
dotevn.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbConnector = new MongoDBConnector();
  const user: User = req.body.user;
  const userAlreaduExists = await dbConnector.find(UserModel, {
    email: user.email,
  });
  if (userAlreaduExists.length > 0) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const password = user.password;
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  const result = await UserModel.create(user);
  const { token, refreshToken } = issueToken({ id: user._id, role: user.role });
  console.log("Token: " + token);

  setCookie(res, "token", token, { maxAge: 60 * 60 * 24 * 7 });
  setCookie(res, "refreshToken", refreshToken, { maxAge: 60 * 60 * 24 * 7 });

  const temp = getCookie(req, "token");
  console.log("Access token:  " + temp);

  console.log(result);
  res.status(200).json({ result });
}
