// pages/api/admin/users/[id]/[action].ts

import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "@/lib/models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { _id, action } = req.query;

    console.log(req.query)

    // Only allow PATCH requests
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Validate action
    if (action !== "ban" && action !== "unban") {
        return res.status(400).json({ message: "Invalid action. Use 'ban' or 'unban'." });
    }

    try {
        // Find the user by ID
        const user = await UserModel.findById(_id);

        console.log("user",user)

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Perform the action
        if (action === "ban") {
            user.ban = true;
        } else if (action === "unban") {
            user.ban = false;
        }

        // Save the updated user
        await user.save();

        // Exclude sensitive fields before sending the response
        const { password, ...userData } = user.toObject();

        return res.status(200).json({
            message: `User has been ${action === "ban" ? "banned" : "unbanned"}.`,
            user: userData,
        });
    } catch (error) {
        console.error("Error performing action:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}
