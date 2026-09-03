import express from "express";

import {
    getAllUsers,
    getUserById,
    updateUser,
    activateUser,
    deactivateUser,
    verifyUser,
    unverifyUser,
    deleteUser,
} from "../../controllers/admin/adminUser.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminUserRouter = express.Router();


// ==========================================
// GET ALL USERS
// ==========================================

adminUserRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAllUsers
);


// ==========================================
// GET SINGLE USER
// ==========================================

adminUserRouter.get(
    "/:userId",
    isAuthenticated,
    isAdmin,
    getUserById
);


// ==========================================
// UPDATE USER
// ==========================================

adminUserRouter.put(
    "/:userId",
    isAuthenticated,
    isAdmin,
    updateUser
);


// ==========================================
// ACTIVATE USER
// ==========================================

adminUserRouter.patch(
    "/:userId/activate",
    isAuthenticated,
    isAdmin,
    activateUser
);


// ==========================================
// DEACTIVATE USER
// ==========================================

adminUserRouter.patch(
    "/:userId/deactivate",
    isAuthenticated,
    isAdmin,
    deactivateUser
);


// ==========================================
// VERIFY USER
// ==========================================

adminUserRouter.patch(
    "/:userId/verify",
    isAuthenticated,
    isAdmin,
    verifyUser
);


// ==========================================
// UNVERIFY USER
// ==========================================

adminUserRouter.patch(
    "/:userId/unverify",
    isAuthenticated,
    isAdmin,
    unverifyUser
);


// ==========================================
// DELETE USER
// ==========================================

adminUserRouter.delete(
    "/:userId",
    isAuthenticated,
    isAdmin,
    deleteUser
);

export default adminUserRouter;