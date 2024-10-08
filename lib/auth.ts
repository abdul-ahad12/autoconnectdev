import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "./cookie";
dotenv.config();

interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: { id: string; role: string }; // Define the user property
}

const secretToken = process.env.SECRET_TOKEN;
const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;

function sendError(res: NextApiResponse, msg: string) {
  return res.status(403).json({ success: false, message: msg });
}

async function authorize(
  req: AuthenticatedNextApiRequest, // Use the extended interface
  res: NextApiResponse,
  next: () => void
) {
  try {
    const accessToken: string = req.cookies["access-token"];
    const refreshToken: string = req.cookies["refresh-token"];

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
                
                return sendError(res, "Error: Invalid refresh token");
              }

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

              next();
            }
          );
        } else if (err) {
          
          return sendError(res, "Error: Broken Token");
        } else {
          // Set user information in req.user
          req.user = decodedToken;

          // Access token is valid, continue with the request
          next();
        }
      }
    );
  } catch (err) {
    
    return res.status(500).json({ message: "Server Error Occurred" });
  }
}

function issueToken(user) {
  
  const accessToken = jwt.sign({ id: user.id, role: user.role }, secretToken, {
    expiresIn: accessTokenExpiryTime,
  });
  const refreshToken = jwt.sign({ id: user.id, role: user.role }, secretToken, {
    expiresIn: refreshTokenExpiryTime,
  });
  return { accessToken, refreshToken };
}

export { authorize, issueToken };
