import { User } from "../../models/user.model.js";

// ==========================================
// GET ADMIN PROFILE
// ==========================================

export const getAdminProfile = async (req, res) => {
    try {
        const admin = await User.findOne({
            _id: req.userId,
            role: "admin",
        }).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            admin,
        });
    } catch (error) {
        console.error("Get admin profile error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// UPDATE ADMIN PROFILE
// ==========================================

export const updateAdminProfile = async (req, res) => {
    try {
        const { name, phoneNumber, bio, profilePicture } = req.body;

        const updateData = {};

        if (name !== undefined) {
            updateData.name = name;
        }

        if (phoneNumber !== undefined) {
            updateData.phoneNumber = phoneNumber;
        }

        if (bio !== undefined) {
            updateData.bio = bio;
        }

        if (profilePicture !== undefined) {
            updateData.profilePicture = profilePicture;
        }

        const admin = await User.findOneAndUpdate(
            {
                _id: req.userId,
                role: "admin",
            },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
            admin,
        });
    } catch (error) {
        console.error("Update admin profile error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};