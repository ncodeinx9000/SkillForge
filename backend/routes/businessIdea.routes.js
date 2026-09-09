import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  activeBusinessIdea,
  getBusinessIdeaById,
  getRecommendedIdea,
  selectBusinessIdea,
} from "../controllers/businessIdea.controller.js";

const businessIdeaRouter = express.Router();

businessIdeaRouter.get(
  "/getBusinessIdeas/",
  isAuthenticated,
  getRecommendedIdea,
);
businessIdeaRouter.get(
  "/getBusinessIdeaById/:businessIdeaId",
  isAuthenticated,
  getBusinessIdeaById,
);
businessIdeaRouter.get(
  "/activeBusinessIdea",
  isAuthenticated,
  activeBusinessIdea,
);
businessIdeaRouter.post(
  "/select/:businessIdeaId",
  isAuthenticated,
  selectBusinessIdea,
);

export default businessIdeaRouter;
