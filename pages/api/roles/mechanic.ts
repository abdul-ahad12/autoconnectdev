// pages/api/isMechanic.js

import { authorize } from "@/lib/auth";

export default function handler(req, res) {
  authorize(req, res, async () => {
    const user = req["user"];
    if (user.role === "MECHANIC") {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  });
}
