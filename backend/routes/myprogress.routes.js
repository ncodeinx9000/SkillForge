import express from "express";

import { isAuthenticated } from "../middleware/auth.js";

import {
  getMyProgress,
  toggleResourceCompletion,
  toggleTaskCompletion,
} from "../controllers/progress.controller.js";


const progressRouter = express.Router();


// Get learner progress
progressRouter.get(
  "/my-progress",
  isAuthenticated,
  getMyProgress
);


// Toggle task completion
progressRouter.patch(
  "/task/:taskId",
  isAuthenticated,
  toggleTaskCompletion
);

progressRouter.patch(
  "/resource/:resourceId",
  isAuthenticated,
  toggleResourceCompletion
);

export default progressRouter;