import { LearnerProgress } from "../models/learnerProgress.model.js";
import { User } from "../models/user.model.js";
import { Session } from "../models/session.model.js";
import { Notification } from "../models/notification.model.js";
import { LearnerProfile } from "../models/LearnerProfile.js";

export const getLearnerDashboard = async (req, res) => {
  try {
    const learnerId = req.userId;

    // Find learner
    const learner = await User.findById(learnerId).select("-password");
    const learnerProfile = await LearnerProfile.findOne({ user: learnerId }).select("skills interests budget location");

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    // Find learner progress
    // Do NOT restrict this to Active.
    // A completed roadmap should still be visible.
    const progress = await LearnerProgress.findOne({
      learner: learnerId,
    })
      .sort({ updatedAt: -1 })
      .populate("businessIdea")
      .populate({ path: "roadmap", populate: { path: "steps.resources" } })
      .populate("bookedMentor");

    const [sessions, unreadNotifications] = await Promise.all([
      Session.find({ learner: learnerId, status: { $in: ["pending", "confirmed"] } })
        .populate({ path: "mentor", populate: { path: "user", select: "name profilePicture" } })
        .sort({ date: 1 }).limit(5),
      Notification.countDocuments({ recipient: learnerId, isRead: false }),
    ]);

    if (!progress) {
      return res.status(200).json({
        success: true,
        dashboard: { learner: { ...learner.toObject(), interests: learnerProfile?.interests || [], skills: learnerProfile?.skills || [], budget: learnerProfile?.budget || "", location: learnerProfile?.location || "" }, businessIdea: null, roadmap: null, roadmapProgress: 0, currentStep: null, status: null, completedSteps: 0, completedTasks: 0, completedResources: 0, bookedMentor: [], sessions, unreadNotifications },
      });
    }

    return res.status(200).json({
      success: true,

      dashboard: {
        learner: { ...learner.toObject(), interests: learnerProfile?.interests || [], skills: learnerProfile?.skills || [], budget: learnerProfile?.budget || "", location: learnerProfile?.location || "" },

        businessIdea: progress.businessIdea,

        roadmap: progress.roadmap,

        roadmapProgress: progress.roadmapProgress,

        currentStep: progress.currentStep,

        status: progress.status,

        completedSteps:
          progress.completedSteps?.length || 0,

        completedTasks:
          progress.completedTask?.length || 0,

        completedResources: progress.completedResources?.length || 0,

        // Send actual completed task IDs to frontend
        completedTaskIds:
          (progress.completedTask || []).map(
            (task) => task.taskId.toString()
          ),

        bookedMentor:
          progress.bookedMentor || [],

        sessions,
        unreadNotifications,
      },
    });
  } catch (error) {
    console.error(
      "Get learner dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load learner dashboard",
      error: error.message,
    });
  }
};