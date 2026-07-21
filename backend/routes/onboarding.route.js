import express from "express";

import {
  saveBudget,
  saveInterests,
  saveLocation,
  saveSkill,
} from "../controllers/onboarding.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const onBoardRouter = express.Router();

onBoardRouter.put("/skills", isAuthenticated, saveSkill);
onBoardRouter.put("/interests", isAuthenticated, saveInterests);
onBoardRouter.put("/budget", isAuthenticated, saveBudget);
onBoardRouter.put("/location", isAuthenticated, saveLocation);

export default onBoardRouter;
