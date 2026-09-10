import { User } from "../models/user.model.js";
import { Roadmap } from "../models/roadmap.model.js";
import { LearnerProgress } from "../models/learnerProgress.model.js";

// =====================================================
// HELPER: BUILD PROGRESS DATA
// =====================================================

const buildProgressData = async (progress) => {
  // ---------------------------------------------------
  // Get roadmap with business idea + resources
  // ---------------------------------------------------

  const roadmap = await Roadmap.findById(progress.roadmap)
    .populate("businessIdea")
    .populate("steps.resources");

  // ---------------------------------------------------
  // Roadmap not found
  // ---------------------------------------------------

  if (!roadmap) {
    return {
      _id: progress._id,
      businessIdea: null,
      roadmap: null,

      roadmapProgress: {
        completed: 0,
        total: 0,
        percentage: 0,
      },

      resourceProgress: {
        completed: 0,
        total: 0,
        percentage: 0,
      },

      stepProgress: [],
      completedTaskIds: [],
      completedStepIds: [],
      completedResourceIds: [],

      bookedMentor: progress.bookedMentor || [],

      startedAt: progress.startedAt,
      completedAt: progress.completedAt,
      status: progress.status,
    };
  }

  // =====================================================
  // TASK PROGRESS
  // =====================================================

  let totalTasks = 0;

  const completedTaskIds = (
    progress.completedTask || []
  ).map((task) => task.taskId.toString());

  const completedStepIds = (
    progress.completedSteps || []
  ).map((step) => step.stepId.toString());

  // =====================================================
  // STEP PROGRESS
  // =====================================================

  const stepProgress = roadmap.steps.map((step) => {
    const totalStepTasks = step.tasks?.length || 0;

    const completedStepTasks =
      step.tasks?.filter((task) =>
        completedTaskIds.includes(task._id.toString())
      ).length || 0;

    totalTasks += totalStepTasks;

    const percentage =
      totalStepTasks > 0
        ? Math.round(
            (completedStepTasks / totalStepTasks) * 100
          )
        : 0;

    return {
      stepId: step._id,
      order: step.order,
      title: step.title,

      completedTasks: completedStepTasks,
      totalTasks: totalStepTasks,

      percentage,

      completed:
        percentage === 100 && totalStepTasks > 0,
    };
  });

  // =====================================================
  // ROADMAP PROGRESS
  // =====================================================

  const completedTasks =
    completedTaskIds.length;

  const roadmapPercentage =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  // =====================================================
  // RESOURCE PROGRESS
  // =====================================================

  // Only count resources that learners can actually see.
  const learnerResources = roadmap.steps.flatMap(
    (step) =>
      (step.resources || []).filter(
        (resource) =>
          resource &&
          resource.status === "approved" &&
          resource.isPublished === true
      )
  );

  const totalResources =
    learnerResources.length;

  const availableResourceIds =
    learnerResources.map((resource) =>
      resource._id.toString()
    );

  // Only keep completed resources that still belong
  // to the learner-visible resources of this roadmap.
  const completedResourceIds = (
    progress.completedResources || []
  )
    .map((resource) =>
      resource.resourceId.toString()
    )
    .filter((resourceId) =>
      availableResourceIds.includes(resourceId)
    );

  const completedResources =
    completedResourceIds.length;

  const resourcePercentage =
    totalResources > 0
      ? Math.round(
          (completedResources / totalResources) * 100
        )
      : 0;

  // =====================================================
  // RETURN COMPLETE PROGRESS DATA
  // =====================================================

  return {
    _id: progress._id,

    // ---------------------------------------------------
    // Business idea
    // ---------------------------------------------------

    businessIdea: roadmap.businessIdea,

    // ---------------------------------------------------
    // Complete roadmap
    // Includes populated resources
    // ---------------------------------------------------

    roadmap,

    // ---------------------------------------------------
    // Task progress
    // ---------------------------------------------------

    roadmapProgress: {
      completed: completedTasks,
      total: totalTasks,
      percentage: roadmapPercentage,
    },

    // ---------------------------------------------------
    // Resource progress
    // ---------------------------------------------------

    resourceProgress: {
      completed: completedResources,
      total: totalResources,
      percentage: resourcePercentage,
    },

    // ---------------------------------------------------
    // Individual step progress
    // ---------------------------------------------------

    stepProgress,

    // ---------------------------------------------------
    // IDs used by frontend
    // ---------------------------------------------------

    completedTaskIds,
    completedStepIds,
    completedResourceIds,

    // ---------------------------------------------------
    // Mentors
    // ---------------------------------------------------

    bookedMentor: progress.bookedMentor || [],

    // ---------------------------------------------------
    // Dates
    // ---------------------------------------------------

    startedAt: progress.startedAt,
    completedAt: progress.completedAt,

    // ---------------------------------------------------
    // Active / Completed
    // ---------------------------------------------------

    status: progress.status,
  };
};

// =====================================================
// GET MY PROGRESS
// =====================================================

export const getMyProgress = async (req, res) => {
  try {
    const learnerId = req.userId;

    // ---------------------------------------------------
    // Check user
    // ---------------------------------------------------

    const user = await User.findById(learnerId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ---------------------------------------------------
    // Get all learner progress
    // ---------------------------------------------------

    const progressRecords =
      await LearnerProgress.find({
        learner: learnerId,
      })
        .populate("businessIdea")
        .populate("bookedMentor")
        .sort({ updatedAt: -1 });

    // ---------------------------------------------------
    // Separate Active and Completed
    // ---------------------------------------------------

    let activeProgress = null;

    const completedProgress = [];

    for (const progress of progressRecords) {
      const data =
        await buildProgressData(progress);

      // -----------------------------------------------
      // Active roadmap
      // -----------------------------------------------

      if (progress.status === "Active") {
        // Most recently updated active roadmap
        if (!activeProgress) {
          activeProgress = data;
        }
      }

      // -----------------------------------------------
      // Completed roadmap
      // -----------------------------------------------

      if (progress.status === "Completed") {
        completedProgress.push(data);
      }
    }

    // ---------------------------------------------------
    // Response
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,

      activeRoadmap: activeProgress,

      completedRoadmaps: completedProgress,
    });
  } catch (error) {
    console.error(
      "Get My Progress Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// TOGGLE TASK COMPLETION
// =====================================================

export const toggleTaskCompletion = async (
  req,
  res
) => {
  try {
    const learnerId = req.userId;
    const { taskId } = req.params;

    // ---------------------------------------------------
    // Find ACTIVE learner progress
    // ---------------------------------------------------

    const progress =
      await LearnerProgress.findOne({
        learner: learnerId,
        status: "Active",
      });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "No active roadmap progress found",
      });
    }

    // ---------------------------------------------------
    // Get roadmap
    // ---------------------------------------------------

    const roadmap =
      await Roadmap.findById(
        progress.roadmap
      );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // ---------------------------------------------------
    // Check whether task exists
    // ---------------------------------------------------

    let taskExists = false;

    for (const step of roadmap.steps) {
      const foundTask =
        step.tasks?.find(
          (task) =>
            task._id.toString() === taskId
        );

      if (foundTask) {
        taskExists = true;
        break;
      }
    }

    if (!taskExists) {
      return res.status(404).json({
        success: false,
        message:
          "Task does not belong to this roadmap",
      });
    }

    // ---------------------------------------------------
    // Check current completion state
    // ---------------------------------------------------

    const existingIndex =
      (progress.completedTask || []).findIndex(
        (task) =>
          task.taskId.toString() === taskId
      );

    let message;

    // =================================================
    // MARK COMPLETE
    // =================================================

    if (existingIndex === -1) {
      progress.completedTask.push({
        taskId,
        completedAt: new Date(),
      });

      message = "Task marked as completed";
    }

    // =================================================
    // MARK INCOMPLETE
    // =================================================

    else {
      progress.completedTask.splice(
        existingIndex,
        1
      );

      message = "Task marked as incomplete";
    }

    // =================================================
    // CALCULATE TOTAL TASKS
    // =================================================

    let totalTasks = 0;

    roadmap.steps.forEach((step) => {
      totalTasks += step.tasks?.length || 0;
    });

    const completedTasks =
      progress.completedTask.length;

    const roadmapProgress =
      totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) * 100
          )
        : 0;

    progress.roadmapProgress =
      roadmapProgress;

    // =================================================
    // CALCULATE COMPLETED STEPS
    // =================================================

    progress.completedSteps = [];

    for (const step of roadmap.steps) {
      const tasks = step.tasks || [];

      // Ignore steps with no tasks
      if (tasks.length === 0) {
        continue;
      }

      const allTasksCompleted =
        tasks.every((task) =>
          progress.completedTask.some(
            (completedTask) =>
              completedTask.taskId.toString() ===
              task._id.toString()
          )
        );

      if (allTasksCompleted) {
        progress.completedSteps.push({
          stepId: step._id,
          completedAt: new Date(),
        });
      }
    }

    // =================================================
    // FIND CURRENT STEP
    // =================================================

    const firstIncompleteStep =
      roadmap.steps.find((step) => {
        const tasks = step.tasks || [];

        if (tasks.length === 0) {
          return false;
        }

        return !tasks.every((task) =>
          progress.completedTask.some(
            (completedTask) =>
              completedTask.taskId.toString() ===
              task._id.toString()
          )
        );
      });

    progress.currentStep =
      firstIncompleteStep?._id || null;

    // =================================================
    // ROADMAP COMPLETED
    // =================================================

    if (
      roadmapProgress === 100 &&
      totalTasks > 0
    ) {
      progress.status = "Completed";

      progress.completedAt =
        progress.completedAt || new Date();

      progress.currentStep = null;
    }

    // =================================================
    // ROADMAP BECAME ACTIVE AGAIN
    // =================================================

    else {
      progress.status = "Active";
      progress.completedAt = null;
    }

    // ---------------------------------------------------
    // Save
    // ---------------------------------------------------

    await progress.save();

    // =================================================
    // BUILD UPDATED PROGRESS
    // =================================================

    const updatedProgress =
      await buildProgressData(progress);

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message,

      progress: updatedProgress,
    });
  } catch (error) {
    console.error(
      "Toggle Task Completion Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// TOGGLE RESOURCE COMPLETION
// =====================================================

export const toggleResourceCompletion = async (
  req,
  res
) => {
  try {
    const learnerId = req.userId;
    const { resourceId } = req.params;

    // ---------------------------------------------------
    // Find ACTIVE learner progress
    // ---------------------------------------------------

    const progress =
      await LearnerProgress.findOne({
        learner: learnerId,
        status: "Active",
      });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "No active roadmap progress found",
      });
    }

    // ---------------------------------------------------
    // Get roadmap with resources
    // ---------------------------------------------------

    const roadmap =
      await Roadmap.findById(
        progress.roadmap
      ).populate("steps.resources");

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // ---------------------------------------------------
    // Check whether resource belongs to roadmap
    // AND is visible to learner
    // ---------------------------------------------------

    let resourceExists = false;

    for (const step of roadmap.steps) {
      const foundResource =
        step.resources?.find(
          (resource) =>
            resource &&
            resource._id.toString() ===
              resourceId &&
            resource.status === "approved" &&
            resource.isPublished === true
        );

      if (foundResource) {
        resourceExists = true;
        break;
      }
    }

    if (!resourceExists) {
      return res.status(404).json({
        success: false,
        message:
          "Resource does not belong to this roadmap or is not available",
      });
    }

    // ---------------------------------------------------
    // Check current completion state
    // ---------------------------------------------------

    if (!progress.completedResources) {
      progress.completedResources = [];
    }

    const existingIndex =
      progress.completedResources.findIndex(
        (resource) =>
          resource.resourceId.toString() ===
          resourceId
      );

    let message;

    // ---------------------------------------------------
    // MARK COMPLETE
    // ---------------------------------------------------

    if (existingIndex === -1) {
      progress.completedResources.push({
        resourceId,
        completedAt: new Date(),
      });

      message =
        "Resource marked as completed";
    }

    // ---------------------------------------------------
    // MARK INCOMPLETE
    // ---------------------------------------------------

    else {
      progress.completedResources.splice(
        existingIndex,
        1
      );

      message =
        "Resource marked as incomplete";
    }

    // =====================================================
    // CALCULATE TOTAL AVAILABLE RESOURCES
    // =====================================================

    const learnerResources =
      roadmap.steps.flatMap(
        (step) =>
          (step.resources || []).filter(
            (resource) =>
              resource &&
              resource.status === "approved" &&
              resource.isPublished === true
          )
      );

    const totalResources =
      learnerResources.length;

    // =====================================================
    // COMPLETED RESOURCE IDS
    // =====================================================

    const availableResourceIds =
      learnerResources.map((resource) =>
        resource._id.toString()
      );

    const completedResourceIds =
      progress.completedResources
        .map((resource) =>
          resource.resourceId.toString()
        )
        .filter((id) =>
          availableResourceIds.includes(id)
        );

    const completedResourceCount =
      completedResourceIds.length;

    // =====================================================
    // RESOURCE PROGRESS
    // =====================================================

    const resourceProgress =
      totalResources > 0
        ? Math.round(
            (completedResourceCount /
              totalResources) *
              100
          )
        : 0;

    progress.resourceProgress =
      resourceProgress;

    // ---------------------------------------------------
    // Save
    // ---------------------------------------------------

    await progress.save();

    // ---------------------------------------------------
    // Response
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,

      message,

      progress: {
        resourceProgress:
          progress.resourceProgress,

        completedResources:
          completedResourceCount,

        completedResourceIds,
      },
    });
  } catch (error) {
    console.error(
      "Toggle Resource Completion Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};