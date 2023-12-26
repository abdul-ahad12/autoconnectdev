import { serialize, parse } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";

export function setCookie(
  res: NextApiResponse,
  name: string,
  value: string,
  options: Record<string, any> = {}
): void {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  // Set the cookie in the response headers
  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
}

export function getCookie(
  req: NextApiRequest,
  name: string
): string | undefined {
  const cookie = parse(req.headers.cookie || "");
  return cookie[name];
}
