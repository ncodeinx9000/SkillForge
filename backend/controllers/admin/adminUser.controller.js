import { User } from "../../models/user.model.js";

// ==========================================
// GET ALL USERS
// ==========================================

export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;

        const filter = {
            // Do not show admin accounts
            role: { $ne: "admin" },
        };

        // Optional role filter
        if (
            role &&
            ["learner", "mentor"].includes(role)
        ) {
            filter.role = role;
        }

        const users = await User.find(filter)
            .select(
                "-password"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(
            "Get all users error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GET SINGLE USER
// ==========================================

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({
            _id: userId,
            role: { $ne: "admin" },
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(
            "Get user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// UPDATE USER
// ==========================================

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const allowedFields = [
            "name",
            "phoneNumber",
            "bio",
            "profilePicture",
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] =
                    req.body[field];
            }
        });

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                role: { $ne: "admin" },
            },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        console.error(
            "Update user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// ACTIVATE USER
// ==========================================

export const activateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                role: { $ne: "admin" },
            },
            {
                isActive: true,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User activated successfully",
            user,
        });
    } catch (error) {
        console.error(
            "Activate user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// DEACTIVATE USER
// ==========================================

export const deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                role: { $ne: "admin" },
            },
            {
                isActive: false,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deactivated successfully",
            user,
        });
    } catch (error) {
        console.error(
            "Deactivate user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==========================================
// VERIFY USER
// ==========================================

export const verifyUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { isVerified: true },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
            user,
        });
    } catch (error) {
        console.error("Verify user error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// UNVERIFY USER
// ==========================================

export const unverifyUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { isVerified: false },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User verification removed successfully",
            user,
        });
    } catch (error) {
        console.error("Unverify user error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// DELETE USER
// ==========================================

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOneAndDelete({
            _id: userId,
            role: { $ne: "admin" },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};