import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getMyProgress } from "../controllers/progress.controller.js";

const progressRouter = express.Router();

progressRouter.get("/my-progress", isAuthenticated, getMyProgress);

export default progressRouter;