import express from "express";

import {
    createQuestion,
    getLearnerQuestions,
    getMentorQuestions,
    answerQuestion,
} from "../controllers/mentor/question.controller.js";

import { isAuthenticated } from "../middleware/auth.js";
import { isLearner, isMentor } from "../middleware/role.js";

const questionRouter = express.Router();


// Learner asks a question
questionRouter.post(
    "/create",
    isAuthenticated,
    isLearner,
    createQuestion
);


// Learner gets their questions
questionRouter.get(
    "/learner/all",
    isAuthenticated,
    isLearner,
    getLearnerQuestions
);


// Mentor gets assigned questions
questionRouter.get(
    "/mentor/all",
    isAuthenticated,
    isMentor,
    getMentorQuestions
);


// Mentor answers a question
questionRouter.patch(
    "/:questionId/answer",
    isAuthenticated,
    isMentor,
    answerQuestion
);


export default questionRouter;