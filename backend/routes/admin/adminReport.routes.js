import express from "express";

import {
    getAllReports,
    getReportById,
    resolveReport,
    dismissReport,
    deleteReport,
} from "../../controllers/admin/adminReport.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminReportRouter = express.Router();


// Get all reports
adminReportRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAllReports
);


// Get single report
adminReportRouter.get(
    "/:reportId",
    isAuthenticated,
    isAdmin,
    getReportById
);


// Resolve report
adminReportRouter.patch(
    "/:reportId/resolve",
    isAuthenticated,
    isAdmin,
    resolveReport
);


// Close report
adminReportRouter.patch(
    "/:reportId/dismiss",
    isAuthenticated,
    isAdmin,
    dismissReport
);


// Delete report
adminReportRouter.delete(
    "/:reportId",
    isAuthenticated,
    isAdmin,
    deleteReport
);


export default adminReportRouter;