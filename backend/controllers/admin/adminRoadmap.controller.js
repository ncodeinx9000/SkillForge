import { Roadmap } from "../../models/roadmap.model.js";
import { BusinessIdea } from "../../models/businessIdea.model.js";

// ==========================================
// CREATE ROADMAP
// ==========================================

export const createRoadmap = async (req, res) => {
  try {
    const {
      businessIdea,
      title,
      category,
      level,
      investmentRange,
      estimatedIncome,
      estimatedDuration,
      steps,
    } = req.body;

    // Required fields
    if (!businessIdea || !title || !category) {
      return res.status(400).json({
        success: false,
        message: "Business idea, title and category are required",
      });
    }

    // Check business idea exists
    const existingBusinessIdea = await BusinessIdea.findById(businessIdea);

    if (!existingBusinessIdea) {
      return res.status(404).json({
        success: false,
        message: "Business idea not found",
      });
    }

    // Create roadmap
    const roadmap = await Roadmap.create({
      businessIdea,
      title,
      category,
      level,
      investmentRange,
      estimatedIncome,
      estimatedDuration,
      steps: steps || [],
      status: "draft",
      createdBy: req.userId,
    });

    await BusinessIdea.findByIdAndUpdate(businessIdea, {
      roadmap: roadmap._id,
    });

    return res.status(201).json({
      success: true,
      message: "Roadmap created successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Create roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL ROADMAPS
// ==========================================

export const getAllRoadmaps = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const roadmaps = await Roadmap.find(filter)
      .populate("businessIdea", "title category difficulty")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      roadmaps,
    });
  } catch (error) {
    console.error("Get roadmaps error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ROADMAP
// ==========================================

export const getRoadmapById = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findById(roadmapId)
      .populate("businessIdea", "title category description difficulty")
      .populate("createdBy", "name email")
      .populate("steps.resources");

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Get roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE ROADMAP
// ==========================================

export const updateRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const allowedFields = [
      "businessIdea",
      "title",
      "category",
      "level",
      "investmentRange",
      "estimatedIncome",
      "estimatedDuration",
      "steps",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const roadmap = await Roadmap.findByIdAndUpdate(roadmapId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap updated successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Update roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// PUBLISH ROADMAP
// ==========================================

export const publishRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findByIdAndUpdate(
      roadmapId,
      {
        status: "published",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap published successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Publish roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UNPUBLISH ROADMAP
// ==========================================

export const unpublishRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findByIdAndUpdate(
      roadmapId,
      {
        status: "draft",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap unpublished successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Unpublish roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ARCHIVE ROADMAP
// ==========================================

export const archiveRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findByIdAndUpdate(
      roadmapId,
      {
        status: "archived",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap archived successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Archive roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE ROADMAP
// ==========================================

export const deleteRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findByIdAndDelete(roadmapId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // Remove roadmap reference from BusinessIdea
    await BusinessIdea.findByIdAndUpdate(roadmap.businessIdea, {
      $unset: {
        roadmap: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    console.error("Delete roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
