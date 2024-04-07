// pages/api/mechanics/approve.js

import { ApprovalStatus, MechanicRegistrationModel } from 'lib/models/mechanic/registration';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const mechanicId = query.mechanicId;

  if (method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Find the mechanic registration by ID
    const mechanicRegistration = await MechanicRegistrationModel.findById(mechanicId);

    if (!mechanicRegistration) {
      return res.status(404).json({ message: 'Mechanic registration not found' });
    }

    // Update the approval status based on the query parameter
    const status = query.approve === 'true' ? ApprovalStatus.APPROVED : ApprovalStatus.REJECTED;
    mechanicRegistration.approvalStatus = status;

    // Save the updated mechanic registration
    await mechanicRegistration.save();

    return res.status(200).json({ message: `Mechanic registration ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error(`Error processing mechanic registration: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
