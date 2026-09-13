import express from "express";
import { createReport } from "../controllers/report.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const reportRouter = express.Router();
reportRouter.post("/", isAuthenticated, createReport);

export default reportRouter;
