import express from "express";

import {
    createMentorProfile,
    getMyMentorProfile,
    getMentorById,
    getAllMentors,
    updateMentorProfile,
} from "../controllers/mentor/mentor.controller.js";

import { isAuthenticated } from "../middleware/auth.js";

const mentorRouter = express.Router();


// Create mentor profile
mentorRouter.post(
    "/create",
    isAuthenticated,
    createMentorProfile
);


// Get logged-in mentor profile
mentorRouter.get(
    "/me",
    isAuthenticated,
    getMyMentorProfile
);


// Get all available mentors
mentorRouter.get(
    "/all",
    isAuthenticated,
    getAllMentors
);


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
    updateMentorProfile
);


export default mentorRouter;