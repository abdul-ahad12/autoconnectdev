// pages/api/isAdmin.js

import { authorize } from "@/lib/auth";

export default function handler(req, res) {
    authorize(req, res, async () => {
      const user = req["user"];
      if (user.role === "ADMIN") {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    });
  }
  