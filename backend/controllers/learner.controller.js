import { LearnerProgress } from "../models/learnerProgress.model.js";
import { User } from "../models/user.model.js";

export const getLearnerDashboard = async (req, res) => {
  try {
    const learnerId = req.userId;

    // Find learner
    const learner = await User.findById(learnerId).select("-password");

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
      .populate("roadmap")
      .populate("bookedMentor");

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "No roadmap found",
      });
    }

    if (!progress.roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not assigned to this business idea",
      });
    }

    return res.status(200).json({
      success: true,

      dashboard: {
        learner,

        businessIdea: progress.businessIdea,

        roadmap: progress.roadmap,

        roadmapProgress: progress.roadmapProgress,

        currentStep: progress.currentStep,

        status: progress.status,

        completedSteps:
          progress.completedSteps?.length || 0,

        completedTasks:
          progress.completedTask?.length || 0,

        // Send actual completed task IDs to frontend
        completedTaskIds:
          (progress.completedTask || []).map(
            (task) => task.taskId.toString()
          ),

        bookedMentor:
          progress.bookedMentor || [],
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