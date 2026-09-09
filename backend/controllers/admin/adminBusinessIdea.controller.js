import { BusinessIdea } from "../../models/businessIdea.model.js";


// CREATE business idea
export const createBusinessIdea = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            investment,
            estimatedIncome,
            launchTime,
            difficulty,
            advantages,
            challenges,
            governmentSchemes,
            tags,
            image,
            mentor,
            roadmap,
            resources,
        } = req.body;

        // Required fields
        if (
            !title ||
            !description ||
            !category ||
            !investment ||
            !estimatedIncome
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, description, category, investment and estimated income are required",
            });
        }

        const businessIdea = await BusinessIdea.create({
            title,
            description,
            category,
            investment,
            estimatedIncome,
            launchTime,
            difficulty,
            advantages,
            challenges,
            governmentSchemes,
            tags,
            image,
            mentor: mentor || null,
            roadmap,
            resources,
            status: "draft",
            isPublished: false,
            createdBy: req.userId,
        });

        return res.status(201).json({
            success: true,
            message: "Business idea created successfully",
            businessIdea,
        });

    } catch (error) {
        console.error("Create business idea error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET all business ideas
export const getAllBusinessIdeas = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const businessIdeas = await BusinessIdea.find(filter)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            businessIdeas,
        });

    } catch (error) {
        console.error("Get business ideas error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET single business idea
export const getBusinessIdeaById = async (req, res) => {
    try {
        const { ideaId } = req.params;

        const businessIdea = await BusinessIdea.findById(ideaId);

        if (!businessIdea) {
            return res.status(404).json({
                success: false,
                message: "Business idea not found",
            });
        }

        return res.status(200).json({
            success: true,
            businessIdea,
        });

    } catch (error) {
        console.error("Get business idea error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// UPDATE business idea
export const updateBusinessIdea = async (req, res) => {
    try {
        const { ideaId } = req.params;

        const businessIdea = await BusinessIdea.findByIdAndUpdate(
            ideaId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!businessIdea) {
            return res.status(404).json({
                success: false,
                message: "Business idea not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Business idea updated successfully",
            businessIdea,
        });

    } catch (error) {
        console.error("Update business idea error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// PUBLISH business idea
export const publishBusinessIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const businessIdea = await BusinessIdea.findByIdAndUpdate(
      ideaId,
      {
        status: "published",
        isPublished: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!businessIdea) {
      return res.status(404).json({
        success: false,
        message: "Business idea not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Business idea published successfully",
      businessIdea,
    });
  } catch (error) {
    console.error("Publish business idea error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UNPUBLISH business idea
export const unpublishBusinessIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const businessIdea = await BusinessIdea.findByIdAndUpdate(
      ideaId,
      {
        status: "draft",
        isPublished: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!businessIdea) {
      return res.status(404).json({
        success: false,
        message: "Business idea not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Business idea unpublished successfully",
      businessIdea,
    });
  } catch (error) {
    console.error("Unpublish business idea error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE business idea
export const deleteBusinessIdea = async (req, res) => {
    try {
        const { ideaId } = req.params;

        const businessIdea = await BusinessIdea.findByIdAndDelete(ideaId);

        if (!businessIdea) {
            return res.status(404).json({
                success: false,
                message: "Business idea not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Business idea deleted successfully",
        });

    } catch (error) {
        console.error("Delete business idea error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const archiveBusinessIdea = async (req, res) => {
    try {
        const { ideaId } = req.params;

        const businessIdea = await BusinessIdea.findByIdAndUpdate(
            ideaId,
            {
                status: "archived",
                isPublished: false,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!businessIdea) {
            return res.status(404).json({
                success: false,
                message: "Business idea not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Business idea archived successfully",
            businessIdea,
        });

    } catch (error) {
        console.error("Archive business idea error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};