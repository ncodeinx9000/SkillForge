import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    type: {
        type: String,
        enum: [
            "session",
            "question",
            "resource",
            "roadmap",
            "review",
            "report",
            "system",
        ],
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    isRead: {
        type: Boolean,
        default: false,
    },    

    readAt: {
        type: Date,
        default: null,
    },

    relatedId: { 
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },

    relatedModel: {
        type: String,
        enum: [
            "Session",
            "Question",
            "Resource",
            "Roadmap",
            "Review",
            "Report"
        ],
        default: null,
    }
},
{ timestamps: true})

export const Notification = mongoose.model(
    "Notification", notificationSchema
);