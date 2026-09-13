import  {Mentor}  from "../../models/mentor.model.js";
import { LearnerProgress } from "../../models/learnerProgress.model.js";
import { Session } from "../../models/session.model.js";
import { Review } from "../../models/Review.model.js";
import Question from "../../models/Question.model.js";
import { Resource } from "../../models/resource.model.js";
import { User } from "../../models/user.model.js";
import { Notification } from "../../models/notification.model.js";

// Create mentor profile
export const createMentorProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const existingMentor = await Mentor.findOne({ user: userId });

        if (existingMentor) {
            return res.status(400).json({
                success: false,
                message: "Mentor profile already exists",
            });
        }

        const {
            title,
            experience,
            languages,
            expertise,
            bio,
            availability,
            yearsOfExperience,
            location,
            socialLinks,
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Mentor title is required",
            });
        }

        const mentor = await Mentor.create({
            user: userId,
            title,
            experience,
            languages,
            expertise,
            bio,
            availability,
            yearsOfExperience,
            location,
            socialLinks,
        });

        const admins = await User.find({ role: "admin", isActive: true }).select("_id");
        if (admins.length) {
            await Notification.insertMany(admins.map((admin) => ({
                recipient: admin._id,
                type: "system",
                title: "New Mentor Verification Request",
                message: "A mentor profile is waiting for review.",
                relatedId: mentor._id,
                relatedModel: null,
            })));
        }

        return res.status(201).json({
            success: true,
            message: "Mentor profile created successfully",
            mentor,
        });

    } catch (error) {
        console.error("Create mentor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create mentor profile",
        });
    }
};


// Get current mentor profile
export const getMyMentorProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const mentor = await Mentor.findOne({ user: userId })
            .populate("user", "-password");

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            mentor,
        });

    } catch (error) {
        console.error("Get mentor profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentor profile",
        });
    }
};


// Get mentor by ID
export const getMentorById = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findOne({ _id: mentorId, verificationStatus: "verified" })
            .populate("user", "-password");

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
        console.error("Get mentor by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentor",
        });
    }
};


// Get all available mentors
export const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find({
            verificationStatus: "verified",
        })
            .populate("user", "-password")
            .sort({ rating: -1 });

        return res.status(200).json({
            success: true,
            count: mentors.length,
            mentors,
        });

    } catch (error) {
        console.error("Get mentors error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentors",
        });
    }
};


// Update mentor profile
export const updateMentorProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const {
            title,
            experience,
            languages,
            expertise,
            bio,
            availability,
            yearsOfExperience,
            location,
            socialLinks,
        } = req.body;

        const mentor = await Mentor.findOne({ user: userId });

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        if (title !== undefined) mentor.title = title;
        if (experience !== undefined) mentor.experience = experience;
        if (languages !== undefined) mentor.languages = languages;
        if (expertise !== undefined) mentor.expertise = expertise;
        if (bio !== undefined) mentor.bio = bio;
        if (availability !== undefined) mentor.availability = availability;
        if (yearsOfExperience !== undefined) {
            mentor.yearsOfExperience = yearsOfExperience;
        }
        if (location !== undefined) mentor.location = location;
        if (socialLinks !== undefined) mentor.socialLinks = socialLinks;

        // A rejected profile must be reviewed again after the mentor updates it.
        // The client never controls verification status.
        if (mentor.verificationStatus === "rejected") {
            mentor.verificationStatus = "pending";
        }

        await mentor.save();

        return res.status(200).json({
            success: true,
            message: "Mentor profile updated successfully",
            mentor,
        });

    } catch (error) {
        console.error("Update mentor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update mentor profile",
        });
    }
};

export const getMyMentees = async (req, res) => {
    try {
        const userId = req.userId;

        // Find mentor profile of logged-in user
        const mentor = await Mentor.findOne({
            user: userId,
        });

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        // Find active learner progress where this mentor
        // has been booked
        const mentees = await LearnerProgress.find({
            bookedMentor: mentor._id,
            status: "Active",
        })
            .populate("learner", "name email profilePicture")
            .populate("businessIdea", "title category")
            .populate("roadmap", "title steps");

        const formattedMentees = mentees.map((progress) => ({
            learner: progress.learner,
            businessIdea: progress.businessIdea,
            roadmap: progress.roadmap,

            roadmapProgress: progress.roadmapProgress || 0,

            currentStep: progress.currentStep,

            completedSteps:
                progress.completedSteps?.length || 0,

            completedTasks:
                progress.completedTask?.length || 0,

            resourceProgress:
                progress.resourceProgress || {
                    completed: 0,
                    total: 0,
                    percentage: 0,
                },

            startedAt: progress.startedAt,
        }));

        return res.status(200).json({
            success: true,
            mentees: formattedMentees,
        });

    } catch (error) {
        console.error("Get mentor mentees error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMentorAnalytics = async (req, res) => {
    try {
        const mentor = await Mentor.findOne({ user: req.userId });
        if (!mentor) return res.status(404).json({ success: false, message: "Mentor profile not found" });
        const [sessions, mentees, reviews, resources, unansweredQuestions] = await Promise.all([
            Session.find({ mentor: mentor._id }).select("status"),
            LearnerProgress.find({ bookedMentor: mentor._id, status: "Active" }).select("roadmapProgress learner"),
            Review.find({ mentor: mentor._id }).select("rating"),
            Resource.countDocuments({ createdBy: req.userId, isPublished: true }),
            Question.countDocuments({ mentor: mentor._id, status: { $ne: "answered" } }),
        ]);
        const averageProgress = mentees.length ? Math.round(mentees.reduce((sum, item) => sum + (item.roadmapProgress || 0), 0) / mentees.length) : 0;
        const averageRating = reviews.length ? Number((reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)) : 0;
        return res.json({ success: true, analytics: { totalMentees: new Set(mentees.map((item) => item.learner.toString())).size, activeMentees: mentees.length, totalSessions: sessions.length, pendingSessions: sessions.filter((item) => item.status === "pending").length, confirmedSessions: sessions.filter((item) => item.status === "confirmed").length, completedSessions: sessions.filter((item) => item.status === "completed").length, rejectedSessions: sessions.filter((item) => item.status === "rejected").length, averageRating, totalReviews: reviews.length, averageProgress, resources, unansweredQuestions } });
    } catch (error) {
        console.error("Mentor analytics error:", error);
        return res.status(500).json({ success: false, message: "Failed to load mentor analytics" });
    }
};
