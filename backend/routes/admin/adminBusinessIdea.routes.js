import express from "express";

import {
    createBusinessIdea,
    getAllBusinessIdeas,
    getBusinessIdeaById,
    updateBusinessIdea,
    publishBusinessIdea,
    unpublishBusinessIdea,
    deleteBusinessIdea,
    archiveBusinessIdea,
} from "../../controllers/admin/adminBusinessIdea.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminBusinessIdeaRouter = express.Router();


// Create
adminBusinessIdeaRouter.post(
    "/create",
    isAuthenticated,
    isAdmin,
    createBusinessIdea
);


// Get all
adminBusinessIdeaRouter.get(
    "/all",
    isAuthenticated,
    isAdmin,
    getAllBusinessIdeas
);


// Get one
adminBusinessIdeaRouter.get(
    "/:ideaId",
    isAuthenticated,
    isAdmin,
    getBusinessIdeaById
);


// Update
adminBusinessIdeaRouter.put(
    "/:ideaId",
    isAuthenticated,
    isAdmin,
    updateBusinessIdea
);


// Publish
adminBusinessIdeaRouter.patch(
    "/:ideaId/publish",
    isAuthenticated,
    isAdmin,
    publishBusinessIdea
);


// Unpublish
adminBusinessIdeaRouter.patch(
    "/:ideaId/unpublish",
    isAuthenticated,
    isAdmin,
    unpublishBusinessIdea
);


// Delete
adminBusinessIdeaRouter.delete(
    "/:ideaId",
    isAuthenticated,
    isAdmin,
    deleteBusinessIdea
);

adminBusinessIdeaRouter.patch(
    "/:ideaId/archive",
    isAuthenticated,
    isAdmin,
    archiveBusinessIdea
);

export default adminBusinessIdeaRouter;