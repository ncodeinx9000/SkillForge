import express from "express";

import { getAdminDashboard } from "../../controllers/admin/adminDashboard.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminDashboardRouter = express.Router();


adminDashboardRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAdminDashboard
);


export default adminDashboardRouter;