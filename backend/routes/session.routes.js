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
import { isLearner, isMentor } from "../middleware/role.js";

const sessionRouter = express.Router();


// Learner creates session request
sessionRouter.post(
    "/create",
    isAuthenticated,
    isLearner,
    createSession
);


// Learner gets their sessions
sessionRouter.get(
    "/learner/all",
    isAuthenticated,
    isLearner,
    getLearnerSessions
);


// Mentor gets their sessions
sessionRouter.get(
    "/mentor",
    isAuthenticated,
    isMentor,
    getMentorSessions
);


// Mentor confirms session
sessionRouter.patch(
    "/:sessionId/confirm",
    isAuthenticated,
    isMentor,
    confirmSession
);


// Mentor rejects session
sessionRouter.patch(
    "/:sessionId/reject",
    isAuthenticated,
    isMentor,
    rejectSession
);


// Mentor completes session
sessionRouter.patch(
    "/:sessionId/complete",
    isAuthenticated,
    isMentor,
    completeSession
);


export default sessionRouter;