import { User } from "../models/user.model.js";
import { Mentor } from "../models/mentor.model.js";
import { BusinessIdea } from "../models/businessIdea.model.js";
import { Roadmap } from "../models/roadmap.model.js";
import { Resource } from "../models/resource.model.js";

export const getPublicHomeData = async (req, res) => {
  try {
    const [users, mentorCount, mentors, ideas, roadmaps, resources] = await Promise.all([
      User.countDocuments({ role: "learner", isActive: true }),
      Mentor.countDocuments({ verificationStatus: "verified", availability: true }),
      Mentor.find({ verificationStatus: "verified", availability: true }).populate("user", "name profilePicture").sort({ rating: -1 }).limit(8),
      BusinessIdea.find({ status: "published", isPublished: true }).populate("mentor", "title rating").populate("roadmap").sort({ createdAt: -1 }).limit(8),
      Roadmap.countDocuments({ status: "published" }),
      Resource.find({ status: "approved", isPublished: true }).sort({ createdAt: -1 }).limit(8),
    ]);

    return res.json({
      success: true,
      stats: { learners: users, mentors: mentorCount, roadmaps, completionRate: null },
      ideas,
      mentors,
      resources,
    });
  } catch (error) {
    console.error("Public home data error:", error);
    return res.status(500).json({ success: false, message: "Unable to load home page data" });
  }
};
