import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            required: true,
        },

        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index(
    { learner: 1, session: 1 },
    { unique: true }
);

export const Review = mongoose.model("Review", reviewSchema);