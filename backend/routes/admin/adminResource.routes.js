import express from "express";

import {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    publishResource,
    unpublishResource,
    deleteResource,
    approveResource,
    rejectResource,
    getAvailableResources,
} from "../../controllers/admin/adminResource.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminResourceRouter = express.Router();


// Create resource
adminResourceRouter.post(
    "/",
    isAuthenticated,
    isAdmin,
    createResource
);


// Get all resources
adminResourceRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAllResources
);


// GET AVAILABLE RESOURCES
adminResourceRouter.get(
    "/available",
    isAuthenticated,
    isAdmin,
    getAvailableResources
);

// Get single resource
adminResourceRouter.get(
    "/:resourceId",
    isAuthenticated,
    isAdmin,
    getResourceById
);


// Update resource
adminResourceRouter.put(
    "/:resourceId",
    isAuthenticated,
    isAdmin,
    updateResource
);


// Publish resource
adminResourceRouter.patch(
    "/:resourceId/publish",
    isAuthenticated,
    isAdmin,
    publishResource
);


// Unpublish resource
adminResourceRouter.patch(
    "/:resourceId/unpublish",
    isAuthenticated,
    isAdmin,
    unpublishResource
);


// Delete resource
adminResourceRouter.delete(
    "/:resourceId",
    isAuthenticated,
    isAdmin,
    deleteResource
);

// Approve resource
adminResourceRouter.patch(
    "/:resourceId/approve",
    isAuthenticated,
    isAdmin,
    approveResource
);

// Reject resource
adminResourceRouter.patch(
    "/:resourceId/reject",
    isAuthenticated,
    isAdmin,
    rejectResource
);


export default adminResourceRouter;