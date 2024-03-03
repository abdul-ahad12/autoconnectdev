import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "./cookie";
dotenv.config();

const secretToken = process.env.SECRET_TOKEN;
const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;

function sendError(res, msg: string) {
  return res.status(403).json({ message: msg });
}



async function authorize(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const accessToken: string = req.cookies["access-token"];
    const refreshToken: string = req.cookies["refresh-token"];
    console.log("AccessToken",accessToken)

    if (!accessToken) return sendError(res, "Error: No Access Token");

    jwt.verify(
      accessToken,
      secretToken,
      async (err: Error, decodedToken: any) => {
        
        if (err instanceof jwt.TokenExpiredError) {
          if (!refreshToken) {
            return sendError(res, "Error: Refresh token missing");
          }

          jwt.verify(
            refreshToken,
            secretToken,
            async (refreshErr: Error, decodedRefreshToken: any) => {
              if (refreshErr) {
                console.log(refreshErr);
                return sendError(res, "Error: Invalid refresh token");
              }

              console.log("decoded token",decodedRefreshToken)

              const { id, role } = decodedRefreshToken;

              const newAccessToken = jwt.sign({ id, role }, secretToken, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
              });

              // Set the new access token in the cookies
              setCookie(res, "access-token", newAccessToken, {
                httpOnly: true,
                secure: true,
              });

              // Set user information in req.user
              req.user = { id, role };

              console.log(id,role)

              next();
            }
          );
        } else if (err) {
          console.log(err);
          return sendError(res, "Error: Broken Token");
        } else {
          console.log("in here",decodedToken)
          // Set user information in req.user
          req["user"] = decodedToken;

          // Access token is valid, continue with the request
          next();
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error Occurred" });
  }
}

function issueToken(user) {
  console.log(user);
  const accessToken = jwt.sign({ id: user.id, role: user.role }, secretToken, {
    expiresIn: accessTokenExpiryTime,
  });
  const refreshToken = jwt.sign({ id: user.id, role: user.role }, secretToken, {
    expiresIn: refreshTokenExpiryTime,
  });
  return { accessToken, refreshToken };
}

export { authorize, issueToken };
