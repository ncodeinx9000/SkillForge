import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getLearnerRoadmap } from "../controllers/roadmap.controller.js";
import { getLearnerDashboard} from "../controllers/learner.controller.js";
import { getAllLearnerResources, getLearnerResource } from "../controllers/resource.controller.js";

const learnerRouter = express.Router();

learnerRouter.get('/dashboard', isAuthenticated, getLearnerDashboard)

learnerRouter.get('/roadmap/:roadmapId', isAuthenticated, getLearnerRoadmap);
learnerRouter.get('/resource/:resourceId', isAuthenticated, getLearnerResource)
learnerRouter.get('/allResources/:roadmapId', isAuthenticated, getAllLearnerResources)

export default learnerRouter;