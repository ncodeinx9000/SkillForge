import { BusinessIdea } from "../models/businessIdea.model.js";
import { LearnerProfile } from "../models/LearnerProfile.js";
import { LearnerProgress } from "../models/learnerProgress.model.js";
import { User } from "../models/user.model.js";


/*
|--------------------------------------------------------------------------
| GET RECOMMENDED BUSINESS IDEAS
|--------------------------------------------------------------------------
*/

export const getRecommendedIdea = async (req, res) => {
  try {
    const learnerId = req.userId;

    const learnerProfile = await LearnerProfile.findOne({
      user: learnerId,
    });

    if (!learnerProfile) {
      return res.status(404).json({
        success: false,
        message: "Learner profile not found",
      });
    }

    if (!learnerProfile.onboardingCompleted) {
      return res.status(400).json({
        success: false,
        message: "Please complete onboarding before viewing recommendations",
      });
    }

    const ideas = await BusinessIdea.find({
      status: "published",
      isPublished: true,

      $or: [
        {
          category: {
            $in: learnerProfile.interests || [],
          },
        },
        {
          tags: {
            $in: learnerProfile.skills || [],
          },
        },
      ],
    })
      .populate("mentor")
      .populate("roadmap")
      .populate("resources")
      .sort({ matchScore: -1 });

    return res.status(200).json({
      success: true,
      count: ideas.length,
      ideas,
    });
  } catch (error) {
    console.error("Get recommended ideas error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET BUSINESS IDEA BY ID
|--------------------------------------------------------------------------
*/

// GET single business idea with complete details
export const getBusinessIdeaById = async (req, res) => {
    try {
        const { ideaId } = req.params;

        // ==========================================
        // GET BUSINESS IDEA
        // ==========================================

        const businessIdea = await BusinessIdea.findById(ideaId)
            .populate({
                path: "mentor",
                populate: {
                    path: "user",
                    select: "name email",
                },
            })
            .populate("roadmap")
            .populate("resources");

        if (!businessIdea) {
            return res.status(404).json({
                success: false,
                message: "Business idea not found",
            });
        }

        // ==========================================
        // GET ROADMAP WITH RESOURCES
        // ==========================================

        let roadmap = null;

        if (businessIdea.roadmap?._id) {
            roadmap = await businessIdea.roadmap.populate(
                "steps.resources"
            );
        }

        // ==========================================
        // GET LEARNERS USING THIS BUSINESS IDEA
        // ==========================================

        const learnerProgress = await LearnerProgress.find({
            businessIdea: ideaId,
        })
            .populate({
                path: "learner",
                select: "name email role",
            })
            .populate({
                path: "bookedMentor",
                populate: {
                    path: "user",
                    select: "name email",
                },
            })
            .populate("roadmap")
            .populate({
                path: "completedResources.resourceId",
                select: "title type url",
            })
            .sort({ updatedAt: -1 });

        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({
            success: true,

            businessIdea,

            roadmap,

            learners: learnerProgress,
        });

    } catch (error) {
        console.error(
            "Get business idea details error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
|--------------------------------------------------------------------------
| GET ACTIVE BUSINESS IDEA
|--------------------------------------------------------------------------
*/

export const activeBusinessIdea = async (req, res) => {
  try {
    const learnerId = req.userId;

    const activeProgress =
      await LearnerProgress.findOne({
        learner: learnerId,
        status: "Active",
      }).populate({
        path: "businessIdea",
        populate: [
          {
            path: "mentor",
          },
          {
            path: "roadmap",
          },
          {
            path: "resources",
          },
        ],
      });

    if (!activeProgress) {
      return res.status(404).json({
        success: false,
        message:
          "No active business idea found for this learner.",
      });
    }

    return res.status(200).json({
      success: true,
      activeBusinessIdea:
        activeProgress.businessIdea,
    });
  } catch (error) {
    console.error(
      "Get active business idea error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------------------------------------------
// SELECT BUSINESS IDEA
// --------------------------------------------------------------------------

// ----------------------------------------------------
// SELECT BUSINESS IDEA
// ----------------------------------------------------
export const selectBusinessIdea = async (req, res) => {
  try {
    const learnerId = req.userId;
    const { businessIdeaId } = req.params;

    // 1. Check learner
    const learner = await User.findById(learnerId);

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    // 2. Make sure the user is a learner
    if (learner.role !== "learner") {
      return res.status(403).json({
        success: false,
        message: "Only learners can select a business idea",
      });
    }

    // 3. Find business idea
    const businessIdea = await BusinessIdea.findOne({
      _id: businessIdeaId,
      isPublished: true,
    }).populate("roadmap");

    if (!businessIdea) {
      return res.status(404).json({
        success: false,
        message: "Business idea not found or not published",
      });
    }

    // 4. A roadmap is required before learner can start
    if (!businessIdea.roadmap) {
      return res.status(400).json({
        success: false,
        message: "Roadmap is not available for this business idea yet",
      });
    }

    // 5. Check if learner already selected this idea
    const existingProgress = await LearnerProgress.findOne({
      learner: learnerId,
      businessIdea: businessIdeaId,
    });

    if (existingProgress) {
      return res.status(200).json({
        success: true,
        message: "Business idea already selected",
        progress: existingProgress,
      });
    }

    // 6. Check if learner already has another active business idea
    const activeProgress = await LearnerProgress.findOne({
      learner: learnerId,
      status: "Active",
    });

    if (activeProgress) {
      return res.status(400).json({
        success: false,
        message:
          "You already have an active business idea. Complete it before selecting another one.",
      });
    }

    // 7. Create learner progress
    const progress = await LearnerProgress.create({
      learner: learnerId,
      businessIdea: businessIdea._id,
      roadmap: businessIdea.roadmap._id,
      status: "Active",
      completedSteps: [],
      completedTask: [],
      completedResources: [],
      roadmapProgress: 0,
      resourceProgress: 0,
      currentStep:
        businessIdea.roadmap.steps?.length > 0
          ? businessIdea.roadmap.steps[0]._id
          : null,
      bookedMentor: businessIdea.mentor
    ? [businessIdea.mentor]
    : [],
      startedAt: new Date(),
    });

    // 8. Save selected business idea in User
    learner.selectedBusinessIdea = businessIdea._id;
    await learner.save();

    // 9. Return complete information
    const populatedProgress = await LearnerProgress.findById(progress._id)
      .populate("businessIdea")
      .populate("roadmap");

    return res.status(201).json({
      success: true,
      message: "Business idea selected successfully",
      progress: populatedProgress,
    });
  } catch (error) {
    console.error("Select business idea error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};