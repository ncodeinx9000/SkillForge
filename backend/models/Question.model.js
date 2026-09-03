import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            default: null,
        },

        question: {
            type: String,
            required: true,
            trim: true,
        },

        answer: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            default: "",
            trim: true,
        },

        answeredAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

const Question = mongoose.model("Question", questionSchema);

export default Question;