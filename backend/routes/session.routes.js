import express from "express";

import {
    createSession,
    getLearnerSessions,
    getMentorSessions,
    confirmSession,
    rejectSession,
    completeSession,
} from "../controllers/mentor/session.controller.js";

import { isAuthenticated } from "../middleware/auth.js";

const sessionRouter = express.Router();


// Learner creates session request
sessionRouter.post(
    "/create",
    isAuthenticated,
    createSession
);


// Learner gets their sessions
sessionRouter.get(
    "/learner/all",
    isAuthenticated,
    getLearnerSessions
);


// Mentor gets their sessions
sessionRouter.get(
    "/mentor",
    isAuthenticated,
    getMentorSessions
);


// Mentor confirms session
sessionRouter.patch(
    "/:sessionId/confirm",
    isAuthenticated,
    confirmSession
);


// Mentor rejects session
sessionRouter.patch(
    "/:sessionId/reject",
    isAuthenticated,
    rejectSession
);


// Mentor completes session
sessionRouter.patch(
    "/:sessionId/complete",
    isAuthenticated,
    completeSession
);


export default sessionRouter;