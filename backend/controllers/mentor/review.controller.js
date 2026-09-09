import { Review } from "../../models/Review.model.js";
import { Mentor } from "../../models/mentor.model.js";
import { Session } from "../../models/session.model.js";
import { Notification } from "../../models/notification.model.js";


// Learner creates a review
export const createReview = async (req, res) => {
    try {
        const learnerId = req.userId;

        const {
            mentorId,
            sessionId,
            rating,
            comment,
        } = req.body;


        // Validate required fields
        if (!mentorId || !sessionId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Mentor, session and rating are required",
            });
        }


        // Check rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }


        // Find the session
        const session = await Session.findOne({
            _id: sessionId,
            learner: learnerId,
            mentor: mentorId,
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found",
            });
        }


        // Review should only be created after session is completed
        if (session.status !== "completed") {
            return res.status(400).json({
                success: false,
                message: "You can review a mentor only after completing the session",
            });
        }


        // Check whether learner has already reviewed this session
        const existingReview = await Review.findOne({
            learner: learnerId,
            session: sessionId,
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this session",
            });
        }


        // Check mentor
        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }


        // Create review
        const review = await Review.create({
            learner: learnerId,
            mentor: mentorId,
            session: sessionId,
            rating,
            comment: comment || "",
        });


        // Recalculate mentor rating
        const ratingData = await Review.aggregate([
            {
                $match: {
                    mentor: mentor._id,
                },
            },
            {
                $group: {
                    _id: "$mentor",
                    averageRating: {
                        $avg: "$rating",
                    },
                    totalReviews: {
                        $sum: 1,
                    },
                },
            },
        ]);


        if (ratingData.length > 0) {
            mentor.rating = Number(
                ratingData[0].averageRating.toFixed(1)
            );

            mentor.totalReviews = ratingData[0].totalReviews;

            await mentor.save();
        }


        // Notify mentor
        await Notification.create({
            recipient: mentor.user,
            type: "review",
            title: "New Review",
            message: "A learner has submitted a review for your mentoring session.",
            relatedId: review._id,
            relatedModel: "Review",
        });


        return res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            review,
        });

    } catch (error) {
        console.error("Create review error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get reviews of a mentor
export const getMentorReviews = async (req, res) => {
    try {
        const { mentorId } = req.params;


        // Check mentor exists
        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }


        const reviews = await Review.find({
            mentor: mentorId,
        })
            .populate("learner", "name profilePicture")
            .populate("session", "title date")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });

    } catch (error) {
        console.error("Get mentor reviews error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get learner's review for a session
export const getMyReview = async (req, res) => {
    try {
        const learnerId = req.userId;
        const { sessionId } = req.params;


        const review = await Review.findOne({
            learner: learnerId,
            session: sessionId,
        })
            .populate("mentor", "title expertise rating")
            .populate("session", "title date");


        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }


        return res.status(200).json({
            success: true,
            review,
        });

    } catch (error) {
        console.error("Get my review error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};