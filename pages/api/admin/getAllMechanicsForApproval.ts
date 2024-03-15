// pages/api/mechanics.js

import { ApprovalStatus, MechanicRegistrationModel } from "lib/models/mechanic/registration";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { page = 1, limit = 10 } = req.query;

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skippedDocuments = (pageNumber - 1) * limitNumber;

    const mechanics = await MechanicRegistrationModel.find({
      approvalStatus: ApprovalStatus.PENDING,
    })
      .skip(skippedDocuments)
      .limit(limitNumber)
      .exec();

    const totalCount = await MechanicRegistrationModel.countDocuments({
      approvalStatus: ApprovalStatus.PENDING,
    });

    res.status(200).json({
      mechanics,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
