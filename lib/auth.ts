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

function authorize(
  req: NextApiRequest,
  res: NextApiResponse,
  next,
  roles = []
) {
  try {
    if (!Array.isArray(roles)) roles = [roles];
    const token: string = req.headers.authorization;

    if (!token) return sendError(res, "Error: No Token");
    if (!token.startsWith("Bearer "))
      return sendError(res, "Error: Token format invalid");

    const tokenString = token.split(" ")[1];
    jwt.verify(
      tokenString,
      secretToken,
      async (err: Error, decodedToken: any) => {
        if (err instanceof jwt.TokenExpiredError) {
          const refreshToken = req.cookies["refresh-token"];

          if (!refreshToken) {
            return sendError(res, "Error: Refresh token missing");
          }

          try {
            const decodedRefreshToken = jwt.verify(refreshToken, secretToken);

            if (!decodedRefreshToken["id"])
              return sendError(res, "Unauntecated user, plaese login again.");
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = issueToken({
              id: decodedRefreshToken["id"],
              role: decodedRefreshToken["role"],
            });

            // Attach the new access token to the request headers
            req.headers.authorization = `Bearer ${newAccessToken}`;
            // Set the new refresh token as a cookie
            setCookie(res, "access-token", newAccessToken, {
              httpOnly: true,
              secure: true,
            });
            setCookie(res, "refresh-token", newRefreshToken, {
              maxAge: 60 * 60 * 24 * 7,
            });

            // Continue authorization process with the new access token
            authorize(req, res, next, roles);
          } catch (refreshErr) {
            console.log(refreshErr);
            return sendError(res, "Error: Invalid refresh token");
          }
        } else if (err) {
          console.log(err);
          return sendError(res, "Error: Broken Token");
        }

        if (!decodedToken["role"]) return sendError(res, "Error: Role missing");
        const userRole = decodedToken["role"];

        if (!roles.includes(userRole))
          return sendError(res, "Error: User not authorized");

        req["user"] = decodedToken;
        next();
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error Occurred" });
  }
}

function issueToken(user) {

  console.log(user)
  const accessToken = jwt.sign({ id: user.id, role: user.role }, secretToken, {
    expiresIn: accessTokenExpiryTime,
  });
  const refreshToken = jwt.sign({ id: user.id }, secretToken, {
    expiresIn: refreshTokenExpiryTime,
  });
  return { accessToken, refreshToken };
}

export { authorize, issueToken };
