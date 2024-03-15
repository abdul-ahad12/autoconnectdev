// pages/api/approvedMechanics.js

import { ApprovalStatus, MechanicRegistrationModel } from "lib/models/mechanic/registration";


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { page = 1, limit = 10 } = req.query;

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skippedDocuments = (pageNumber - 1) * limitNumber;

    const approvedMechanics = await MechanicRegistrationModel.find({
      approvalStatus: ApprovalStatus.APPROVED,
    })
      .skip(skippedDocuments)
      .limit(limitNumber)
      .exec();

    const totalCount = await MechanicRegistrationModel.countDocuments({
      approvalStatus: ApprovalStatus.APPROVED,
    });

    res.status(200).json({
      approvedMechanics,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching approved mechanics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
