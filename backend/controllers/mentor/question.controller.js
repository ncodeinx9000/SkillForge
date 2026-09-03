import Question from "../../models/Question.model.js";
import { Mentor } from "../../models/mentor.model.js";
import { Notification } from "../../models/notification.model.js";


// Learner asks a question
export const createQuestion = async (req, res) => {
    try {
        const learnerId = req.userId;

        const { question, mentorId } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const newQuestion = await Question.create({
            learner: learnerId,
            mentor: mentorId || null,
            question,
            status: mentorId ? "assigned" : "pending",
        });

        if (mentorId) {
            const mentor = await Mentor.findById(mentorId);

            if (mentor) {
                await Notification.create({
                    recipient: mentor.user,
                    type: "question",
                    title: "New Question",
                    message: "A learner has asked you a new question.",
                    relatedId: newQuestion._id,
                    relatedModel: "Question",
                });
            }
        }

        return res.status(201).json({
            success: true,
            message: "Question submitted successfully",
            question: newQuestion,
        });

    } catch (error) {
        console.error("Create question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create question",
        });
    }
};


// Learner gets their questions
export const getLearnerQuestions = async (req, res) => {
    try {
        const learnerId = req.userId;

        const questions = await Question.find({
            learner: learnerId,
        })
            .populate({
                path: "mentor",
                populate: {
                    path: "user",
                    select: "name email profileImage",
                },
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            questions,
        });

    } catch (error) {
        console.error("Get learner questions error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get questions",
        });
    }
};


// Mentor gets assigned questions
export const getMentorQuestions = async (req, res) => {
    try {
        const userId = req.userId;

        const mentor = await Mentor.findOne({
            user: userId,
        });

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        const questions = await Question.find({
            mentor: mentor._id,
        })
            .populate("learner", "-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            questions,
        });

    } catch (error) {
        console.error("Get mentor questions error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentor questions",
        });
    }
};


// Mentor answers question
export const answerQuestion = async (req, res) => {
    try {
        const userId = req.userId;
        const { questionId } = req.params;
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({
                success: false,
                message: "Answer is required",
            });
        }

        const mentor = await Mentor.findOne({
            user: userId,
        });

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        const question = await Question.findOne({
            _id: questionId,
            mentor: mentor._id,
        });

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }

        question.answer = answer;
        question.status = "answered";
        question.answeredAt = new Date();

        await question.save();

        await Notification.create({
            recipient: question.learner,
            type: "question",
            title: "Question Answered",
            message: "Your mentor has answered your question.",
            relatedId: question._id,
            relatedModel: "Question",
        });

        return res.status(200).json({
            success: true,
            message: "Question answered successfully",
            question,
        });

    } catch (error) {
        console.error("Answer question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to answer question",
        });
    }
};