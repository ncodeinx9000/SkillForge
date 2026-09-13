import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { isLearner } from "../middleware/role.js";
import { getLearnerRoadmap } from "../controllers/roadmap.controller.js";
import { getLearnerDashboard} from "../controllers/learner.controller.js";
import { getAllLearnerResources, getLearnerResource } from "../controllers/resource.controller.js";

const learnerRouter = express.Router();

learnerRouter.use(isAuthenticated, isLearner);

learnerRouter.get('/dashboard', getLearnerDashboard)

learnerRouter.get('/roadmap/:roadmapId', getLearnerRoadmap);
learnerRouter.get('/resource/:resourceId', getLearnerResource)
learnerRouter.get('/allResources/:roadmapId', getAllLearnerResources)

export default learnerRouter;
