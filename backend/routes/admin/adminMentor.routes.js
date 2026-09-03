import express from "express";

import {
    getAdminMentors,
    getAdminMentorById,
    approveMentor,
    rejectMentor,
} from "../../controllers/admin/adminMentor.controller.js";

import { isAuthenticated } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/admin.js";

const adminMentorRouter = express.Router();


// Get all mentors
adminMentorRouter.get(
    "/",
    isAuthenticated,
    isAdmin,
    getAdminMentors
);


// Get single mentor
adminMentorRouter.get(
    "/:mentorId",
    isAuthenticated,
    isAdmin,
    getAdminMentorById
);


// Approve mentor
adminMentorRouter.patch(
    "/:mentorId/approve",
    isAuthenticated,
    isAdmin,
    approveMentor
);


// Reject mentor
adminMentorRouter.patch(
    "/:mentorId/reject",
    isAuthenticated,
    isAdmin,
    rejectMentor
);


export default adminMentorRouter;