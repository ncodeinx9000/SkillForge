import express from "express";

import {
    createQuestion,
    getLearnerQuestions,
    getMentorQuestions,
    answerQuestion,
} from "../controllers/mentor/question.controller.js";

import { isAuthenticated } from "../middleware/auth.js";

const questionRouter = express.Router();


// Learner asks a question
questionRouter.post(
    "/create",
    isAuthenticated,
    createQuestion
);


// Learner gets their questions
questionRouter.get(
    "/learner/all",
    isAuthenticated,
    getLearnerQuestions
);


// Mentor gets assigned questions
questionRouter.get(
    "/mentor/all",
    isAuthenticated,
    getMentorQuestions
);


// Mentor answers a question
questionRouter.patch(
    "/:questionId/answer",
    isAuthenticated,
    answerQuestion
);


export default questionRouter;