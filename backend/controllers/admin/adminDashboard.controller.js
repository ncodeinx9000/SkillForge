import { User } from "../../models/user.model.js";
import { Mentor } from "../../models/mentor.model.js";
import { BusinessIdea } from "../../models/businessIdea.model.js";
import { Roadmap } from '../../models/roadmap.model.js'
import { Resource } from "../../models/resource.model.js";
import { Session } from "../../models/session.model.js";
import { Report } from "../../models/report.model.js";


// GET Admin Dashboard Statistics
export const getAdminDashboard = async (req, res) => {
    try {

        const [
            totalUsers,
            activeMentors,
            pendingMentors,
            publishedBusinessIdeas,
            publishedRoadmaps,
            pendingResources,
            openReports,
            totalSessions,
        ] = await Promise.all([

            // Total users
            User.countDocuments(),

            // Verified and available mentors
            Mentor.countDocuments({
                verificationStatus: "verified",
                availability: true,
            }),

            // Mentors waiting for admin approval
            Mentor.countDocuments({
                verificationStatus: "pending",
            }),

            // Published business ideas
            BusinessIdea.countDocuments({
                status: "published",
            }),

            // Published roadmaps
            RoadMap.countDocuments({
                status: "published",
            }),

            // Resources waiting for admin approval
            Resource.countDocuments({
                status: "pending",
            }),

            // Open reports
            Report.countDocuments({
                status: "open",
            }),

            // Total sessions
            Session.countDocuments(),
        ]);


        return res.status(200).json({
            success: true,

            data: {
                totalUsers,
                activeMentors,
                pendingMentors,
                publishedBusinessIdeas,
                publishedRoadmaps,
                pendingResources,
                openReports,
                totalSessions,
            },
        });

    } catch (error) {

        console.error("Admin dashboard error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};