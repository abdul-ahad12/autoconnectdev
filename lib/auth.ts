import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretToken = process.env.SECRET_TOKEN;
const tokenExpiryTime = "1h";

function sendError(res, msg: string) {
  return res.status(403).json({ message: msg });
}

function authorize(roles = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    try {
      const token: string = req.headers.authorization;
      // req.headers["authorization"] || req.headers["Authorization"];

      if (!token) return sendError(res, "Error: No Token");
      if (!token.startsWith("Bearer "))
        return sendError(res, "Error: Token format invalid");

      const tokenString = token.split(" ")[1];
      jwt.verify(tokenString, secretToken, (err: Error, decodedToken: any) => {
        if (err) {
          console.log(err);
          return sendError(res, "Error: Broken Or Expired Token");
        }

        if (!decodedToken["role"]) return sendError(res, "Error: Role missing");
        const userRole = decodedToken["role"];
        if (!roles.includes(userRole))
          return sendError(res, "Error: User not authorized");

        req["user"] = decodedToken;
        next();
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error Occurred" });
    }
  };
}

function issueToken(user) {
  const token = jwt.sign({ ...user, iss: "Node-Auth" }, secretToken, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ ...user, iss: "Node-Auth" }, secretToken, {
    expiresIn: "7d",
  });
  return { token, refreshToken };
}

const roles = {
  User: ["user"],
  Admin: ["admin"],
  All: ["user", "admin"],
};

export { authorize, issueToken, roles };

// import jwt, { JwtPayload } from "jsonwebtoken";

// interface SignOption {
//   expiresIn?: string | number;
// }

// const DEFAULT_SIGN_OPTION: SignOption = {
//   expiresIn: "1h",
// };

// export function signJwtAccessToken(
//   payload: JwtPayload,
//   options: SignOption = DEFAULT_SIGN_OPTION
// ) {
//   const secretKey = process.env.SECRET_KEY;
//   const token = jwt.sign(payload, secretKey, options);
//   return token;
// }

// export function verifyJwt(token: string) {
//   try {
//     const secretKey = process.env.SECRET_KEY;
//     const decoded = jwt.verify(token, secretKey);
//     return decoded as JwtPayload;
//   } catch (error) {
//     console.error(error);
//   }
// }
