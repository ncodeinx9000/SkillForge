import express from "express";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

import {
    getAllUsers,
    getUserById,
    updateUser,
    activateUser,
    deactivateUser,
    verifyUser,
    unverifyUser,
    deleteUser,
    getAllLearners,
    getLearnerDetails,
} from "../../controllers/admin/adminUser.controller.js";


const adminUserRouter = express.Router();


// ======================================================
// GENERAL USER MANAGEMENT
// ======================================================

adminUserRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAllUsers
);


adminUserRouter.put(
    "/:userId",
    isAuthenticated,
    isAdmin,
    updateUser
);

adminUserRouter.patch(
    "/:userId/activate",
    isAuthenticated,
    isAdmin,
    activateUser
);

adminUserRouter.patch(
    "/:userId/deactivate",
    isAuthenticated,
    isAdmin,
    deactivateUser
);

adminUserRouter.patch(
    "/:userId/verify",
    isAuthenticated,
    isAdmin,
    verifyUser
);

adminUserRouter.patch(
    "/:userId/unverify",
    isAuthenticated,
    isAdmin,
    unverifyUser
);

adminUserRouter.delete(
    "/:userId",
    isAuthenticated,
    isAdmin,
    deleteUser
);


// ======================================================
// LEARNER MANAGEMENT
// ======================================================

// IMPORTANT:
// These must come BEFORE "/:userId"

adminUserRouter.get(
    "/learners",
    isAuthenticated,
    isAdmin,
    getAllLearners
);

adminUserRouter.get(
    "/learners/:learnerId",
    isAuthenticated,
    isAdmin,
    getLearnerDetails
);

adminUserRouter.get(
    "/:userId",
    isAuthenticated,
    isAdmin,
    getUserById
);

export default adminUserRouter;