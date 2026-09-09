import express from "express";

import { isAuthenticated } from "../middleware/auth.js";

import {
  getMyProgress,
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


export default progressRouter;