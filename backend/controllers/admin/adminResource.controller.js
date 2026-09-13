import { Resource } from "../../models/resource.model.js";
import { Notification } from "../../models/notification.model.js";


// CREATE RESOURCE
export const createResource = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            url,
            thumbnail,
            estimatedDuration,
            category,
            level,
            tags,
        } = req.body;

        if (!title || !url || !type) {
            return res.status(400).json({
                success: false,
                message: "Title and URL are required",
            });
        }

        const resource = await Resource.create({
             title,
            description,
            type,
            url,
            thumbnail,
            estimatedDuration,
            category,
            level,
            tags,
            
            createdBy: req.userId,

            status: "draft",
            isPublished: false,
        });

        return res.status(201).json({
            success: true,
            message: "Resource created successfully",
            resource,
        });

    } catch (error) {
        console.error("Create resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET ALL RESOURCES
export const getAllResources = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const resources = await Resource.find(filter)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            resources,
        });

    } catch (error) {
        console.error("Get resources error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET SINGLE RESOURCE
export const getResourceById = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        return res.status(200).json({
            success: true,
            resource,
        });

    } catch (error) {
        console.error("Get resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// UPDATE RESOURCE
export const updateResource = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findByIdAndUpdate(
            resourceId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resource updated successfully",
            resource,
        });

    } catch (error) {
        console.error("Update resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// PUBLISH RESOURCE
export const publishResource = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        if (resource.status !== "approved") {
            return res.status(400).json({
                success: false,
                message: "Only approved resources can be published",
            });
        }

        resource.isPublished = true;

        await resource.save();

        return res.status(200).json({
            success: true,
            message: "Resource published successfully",
            resource,
        });

    } catch (error) {
        console.error("Publish resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// UNPUBLISH RESOURCE
export const unpublishResource = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findByIdAndUpdate(
            resourceId,
            {
                isPublished: false,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resource unpublished successfully",
            resource,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// DELETE RESOURCE
export const deleteResource = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findByIdAndDelete(resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resource deleted successfully",
        });

    } catch (error) {
        console.error("Delete resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GET AVAILABLE RESOURCES
// Approved + Published resources
// ==========================================

export const getAvailableResources = async (req, res) => {
    try {
        const resources = await Resource.find({
            status: "approved",
            isPublished: true,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            resources,
        });
    } catch (error) {
        console.error(
            "Get available resources error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// APPROVE RESOURCE
// ==========================================

export const approveResource = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findByIdAndUpdate(
            resourceId,
            {
                status: "approved",
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        await Notification.create({ recipient: resource.createdBy, type: "resource", title: "Resource approved", message: "Your resource was approved by an admin.", relatedId: resource._id, relatedModel: "Resource" });

        return res.status(200).json({
            success: true,
            message: "Resource approved successfully",
            resource,
        });

    } catch (error) {
        console.error("Approve resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// REJECT RESOURCE
// ==========================================

export const rejectResource = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const resource = await Resource.findByIdAndUpdate(
            resourceId,
            {
                status: "rejected",
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        await Notification.create({ recipient: resource.createdBy, type: "resource", title: "Resource rejected", message: "Your resource was rejected and needs changes.", relatedId: resource._id, relatedModel: "Resource" });

        return res.status(200).json({
            success: true,
            message: "Resource rejected successfully",
            resource,
        });

    } catch (error) {
        console.error("Reject resource error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};