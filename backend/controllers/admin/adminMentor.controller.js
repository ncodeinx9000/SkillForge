import { Mentor } from "../../models/mentor.model.js";


// GET all mentors
// Optional: ?status=pending / verified / rejected
export const getAdminMentors = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};

        if (status) {
            filter.verificationStatus = status;
        }

        const mentors = await Mentor.find(filter)
            .populate("user", "name email profilePicture role")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            mentors,
        });

    } catch (error) {
        console.error("Get admin mentors error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET single mentor
export const getAdminMentorById = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId)
            .populate("user", "name email profilePicture role");

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }

        return res.status(200).json({
            success: true,
            mentor,
        });

    } catch (error) {
        console.error("Get admin mentor error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// APPROVE mentor
export const approveMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }

        if (mentor.verificationStatus === "verified") {
            return res.status(400).json({
                success: false,
                message: "Mentor is already verified",
            });
        }

        mentor.verificationStatus = "verified";

        await mentor.save();

        return res.status(200).json({
            success: true,
            message: "Mentor approved successfully",
            mentor,
        });

    } catch (error) {
        console.error("Approve mentor error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// REJECT mentor
export const rejectMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }

        mentor.verificationStatus = "rejected";

        await mentor.save();

        return res.status(200).json({
            success: true,
            message: "Mentor rejected successfully",
            mentor,
        });

    } catch (error) {
        console.error("Reject mentor error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};