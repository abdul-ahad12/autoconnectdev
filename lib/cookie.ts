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

export function setTokensCookies(
  res: NextApiResponse,
  accessToken: string,
  refreshToken: string
): void {
  const accessCookie = serialize("access-token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60,
  });

  const refreshCookie = serialize("refresh-token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);
}

export function getCookie(
  req: NextApiRequest,
  name: string
): string | undefined {
  const cookie = parse(req.headers.cookie || "");
  return cookie[name];
}
