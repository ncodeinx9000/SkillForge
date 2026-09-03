import { LearnerProgress } from "../models/learnerProgress.model.js";
import { User } from "../models/user.model.js";
import { BusinessIdea } from "../models/businessIdea.model.js";

// Get Learner Dashboard
export const getLearnerDashboard = async (req, res) => {
  try {
    // Get logged-in learner ifd from authentication middleware
    const learnerId = req.userId;

    const learner = await User.findById(learnerId).select("-password");

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    const progress = await LearnerProgress.findOne({
        learner: learnerId,
    })
    .populate("businessIdea")
    .populate("roadmap")
    .populate("bookedMentor");

    if(!progress){
        return res.status(404).json({
            success: false,
            message: "Learner progress not found",
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
            completedSteps: progress.completedSteps.length,
            completedTasks: progress.completedTask.length,
            bookedMentor: progress.bookedMentors,
        }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
