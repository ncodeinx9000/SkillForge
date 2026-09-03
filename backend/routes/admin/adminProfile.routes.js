import express from "express";

import {
    getAdminProfile,
    updateAdminProfile,
} from "../../controllers/admin/adminProfile.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminProfileRouter = express.Router();

// GET ADMIN PROFILE

adminProfileRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAdminProfile
);

// UPDATE ADMIN PROFILE

adminProfileRouter.put(
    "/",
    isAuthenticated,
    isAdmin,
    updateAdminProfile
);

export default adminProfileRouter;