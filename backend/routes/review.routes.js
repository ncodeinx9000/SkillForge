import express from "express";

import {
    createReview,
    getMentorReviews,
    getMyReview,
} from "../controllers/mentor/review.controller.js";

import { isAuthenticated } from "../middleware/auth.js";

const reviewRouter = express.Router();


// Learner creates a review
reviewRouter.post(
    "/",
    isAuthenticated,
    createReview
);


// Get reviews of a mentor
reviewRouter.get(
    "/mentor/:mentorId",
    isAuthenticated,
    getMentorReviews
);


// Get learner's review for a session
reviewRouter.get(
    "/session/:sessionId",
    isAuthenticated,
    getMyReview
);


export default reviewRouter;