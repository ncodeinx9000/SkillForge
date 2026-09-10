import { User } from "../../models/user.model.js";
import { LearnerProgress } from "../../models/learnerProgress.model.js";


// ======================================================
// GET ALL USERS
// ======================================================

export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;

        const filter = {
            role: { $ne: "admin" },
        };

        if (role && ["learner", "mentor"].includes(role)) {
            filter.role = role;
        }

        const users = await User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            users,
        });

    } catch (error) {
        console.error("Get all users error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// GET USER BY ID
// ======================================================

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
        console.error("Get user error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// UPDATE USER
// ======================================================

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({
            _id: userId,
            role: { $ne: "admin" },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const allowedFields = [
            "name",
            "email",
            "phone",
            "role",
            "isActive",
            "isVerified",
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        await user.save();

        const updatedUser = await User.findById(user._id)
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Update user error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// ACTIVATE USER
// ======================================================

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
        console.error("Activate user error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// DEACTIVATE USER
// ======================================================

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
        console.error("Deactivate user error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// VERIFY USER
// ======================================================

export const verifyUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                role: { $ne: "admin" },
            },
            {
                isVerified: true,
            },
            {
                new: true,
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


// ======================================================
// UNVERIFY USER
// ======================================================

export const unverifyUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                role: { $ne: "admin" },
            },
            {
                isVerified: false,
            },
            {
                new: true,
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
            message: "User unverified successfully",
            user,
        });

    } catch (error) {
        console.error("Unverify user error:", error);

        return res.status(200).json({
            success: true,
            message: "User unverified successfully",
            user,
        });
    }
};


// ======================================================
// DELETE USER
// ======================================================

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({
            _id: userId,
            role: { $ne: "admin" },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("Delete user error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// ADMIN → GET ALL LEARNERS
// ======================================================

export const getAllLearners = async (req, res) => {
    try {
        const learnerProgress = await LearnerProgress.find()
            .populate({
                path: "learner",
                select: "-password",
                match: { role: "learner" },
            })
            .populate({
                path: "businessIdea",
                select: "title category image status isPublished",
            })
            .populate({
                path: "roadmap",
                select: "title category level status steps",
            })
            .populate({
                path: "bookedMentor",
                populate: {
                    path: "user",
                    select: "name email",
                },
            })
            .sort({ updatedAt: -1 });

        // Remove progress records whose learner is missing
        // or is not actually a learner.
        const learners = learnerProgress
            .filter((progress) => progress.learner)
            .map((progress) => ({
                progressId: progress._id,

                learner: progress.learner,

                businessIdea: progress.businessIdea,

                roadmap: progress.roadmap,

                roadmapProgress: progress.roadmapProgress,

                resourceProgress: progress.resourceProgress,

                status: progress.status,

                currentStep: progress.currentStep,

                bookedMentor: progress.bookedMentor || [],

                startedAt: progress.startedAt,

                completedAt: progress.completedAt,
            }));

        return res.status(200).json({
            success: true,
            count: learners.length,
            learners,
        });

    } catch (error) {
        console.error("Get all learners error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// ADMIN → GET LEARNER DETAILS
// ======================================================

export const getLearnerDetails = async (req, res) => {
    try {
        const { learnerId } = req.params;

        const learner = await User.findOne({
            _id: learnerId,
            role: "learner",
        }).select("-password");

        if (!learner) {
            return res.status(404).json({
                success: false,
                message: "Learner not found",
            });
        }

        const progressRecords = await LearnerProgress.find({
            learner: learnerId,
        })
            .populate({
                path: "businessIdea",
                populate: [
                    {
                        path: "mentor",
                        populate: {
                            path: "user",
                            select: "name email",
                        },
                    },
                    {
                        path: "roadmap",
                    },
                    {
                        path: "resources",
                    },
                ],
            })
            .populate({
                path: "roadmap",
                populate: {
                    path: "steps.resources",
                },
            })
            .populate({
                path: "bookedMentor",
                populate: {
                    path: "user",
                    select: "name email",
                },
            })
            .populate({
                path: "completedResources.resourceId",
            })
            .sort({ updatedAt: -1 });

        const progress = progressRecords.map((record) => ({
            progressId: record._id,

            businessIdea: record.businessIdea,

            roadmap: record.roadmap,

            status: record.status,

            roadmapProgress: record.roadmapProgress,

            resourceProgress: record.resourceProgress,

            currentStep: record.currentStep,

            completedSteps: record.completedSteps,

            completedTask: record.completedTask,

            completedResources: record.completedResources,

            bookedMentor: record.bookedMentor,

            startedAt: record.startedAt,

            completedAt: record.completedAt,

            createdAt: record.createdAt,

            updatedAt: record.updatedAt,
        }));

        return res.status(200).json({
            success: true,

            learner,

            progress,
        });

    } catch (error) {
        console.error("Get learner details error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};