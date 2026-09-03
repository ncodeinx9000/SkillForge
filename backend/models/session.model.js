import mongoose from "mongoose";
import { Mentor } from "../models/mentor.model.js";

const sessionSchema = new mongoose.Schema(
    {
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            required: true,
        },

        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        date: {
            type: Date,
            required: true,
        },

        duration: {
            type: Number,
            default: 30,
        },

        meetingLink: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "completed",
                "cancelled",
                "rejected",
            ],
            default: "pending",
        },

        cancelledBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        cancellationReason: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
)

export const Session = mongoose.model("Session", sessionSchema);