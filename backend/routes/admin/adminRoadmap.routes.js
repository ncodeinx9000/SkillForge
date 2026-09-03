import express from "express";

import {
  createRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  updateRoadmap,
  publishRoadmap,
  unpublishRoadmap,
  archiveRoadmap,
  deleteRoadmap,
} from "../../controllers/admin/adminRoadmap.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminRoadmapRouter = express.Router();

// CREATE
adminRoadmapRouter.post("/", isAuthenticated, isAdmin, createRoadmap);

// GET ALL
adminRoadmapRouter.get("/", isAuthenticated, isAdmin, getAllRoadmaps);

// GET SINGLE
adminRoadmapRouter.get("/:roadmapId", isAuthenticated, isAdmin, getRoadmapById);

// UPDATE
adminRoadmapRouter.put("/:roadmapId", isAuthenticated, isAdmin, updateRoadmap);

// PUBLISH
adminRoadmapRouter.patch(
  "/:roadmapId/publish",
  isAuthenticated,
  isAdmin,
  publishRoadmap,
);

// UNPUBLISH
adminRoadmapRouter.patch(
  "/:roadmapId/unpublish",
  isAuthenticated,
  isAdmin,
  unpublishRoadmap,
);

// ARCHIVE
adminRoadmapRouter.patch(
  "/:roadmapId/archive",
  isAuthenticated,
  isAdmin,
  archiveRoadmap,
);

// DELETE
adminRoadmapRouter.delete(
  "/:roadmapId",
  isAuthenticated,
  isAdmin,
  deleteRoadmap,
);


export default adminRoadmapRouter;
