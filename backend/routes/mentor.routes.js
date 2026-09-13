import express from "express";

import {
    createMentorProfile,
    getMyMentorProfile,
    getMentorById,
    getAllMentors,
    updateMentorProfile,
    getMyMentees,
    getMentorAnalytics,
} from "../controllers/mentor/mentor.controller.js";
import {
    getMyResources,
    createMentorResource,
    updateMentorResource,
    deleteMentorResource,
} from "../controllers/mentor/resource.controller.js";

import { isAuthenticated } from "../middleware/auth.js";
import { isMentor } from "../middleware/role.js";

const mentorRouter = express.Router();


// Create mentor profile
mentorRouter.post(
    "/create",
    isAuthenticated,
    isMentor,
    createMentorProfile
);


// Get logged-in mentor profile
mentorRouter.get(
    "/me",
    isAuthenticated,
    isMentor,
    getMyMentorProfile
);


// Get all available mentors
mentorRouter.get(
    "/all",
    isAuthenticated,
    getAllMentors
);

mentorRouter.get(
    "/mentees",
    isAuthenticated,
    isMentor,
    getMyMentees
);

mentorRouter.get("/resources", isAuthenticated, isMentor, getMyResources);
mentorRouter.get("/analytics", isAuthenticated, isMentor, getMentorAnalytics);
mentorRouter.post("/resources", isAuthenticated, isMentor, createMentorResource);
mentorRouter.put("/resources/:resourceId", isAuthenticated, isMentor, updateMentorResource);
mentorRouter.delete("/resources/:resourceId", isAuthenticated, isMentor, deleteMentorResource);


// Get mentor by ID
mentorRouter.get(
    "/:mentorId",
    isAuthenticated,
    getMentorById
);


// Update logged-in mentor profile
mentorRouter.put(
    "/update",
    isAuthenticated,
    isMentor,
    updateMentorProfile
);


export default mentorRouter;
