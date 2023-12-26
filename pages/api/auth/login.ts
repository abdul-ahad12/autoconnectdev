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
  console.log(user);

  const userAlreadyExists = await dbConnector.find(UserModel, {
    email: user.email,
  });

  if (!userAlreadyExists) {
    res.status(400).json({ message: "User doesn't exists" });
    return;
  }
  bcrypt.compare(
    user.password,
    userAlreadyExists[0].password,
    function (err, result) {
      if (err) {
        res.status(400).json({ message: "Error" });
        return;
      }
      if (result) {
        const { token, refreshToken } = issueToken({
          id: user._id,
          role: user.role,
        });

        setCookie(res, "token", token, { maxAge: 60 * 60 * 24 * 7 });
        setCookie(res, "refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 7,
        });

        res.status(200).json({ result });
      } else {
        res.status(400).json({ message: "Wrong password" });
        return;
      }
    }
  );
}
