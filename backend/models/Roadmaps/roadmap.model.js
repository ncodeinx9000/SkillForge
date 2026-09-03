import mongoose, { mongo } from "mongoose";

const roadmapSchema = new mongoose.Schema({
    // Owner of roadmap
    learner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Learner"
    },

    // Home Tiffin Service
    title: {
        type: String,
        required: true
    },

    // Food & Catering
    category: String,

    // Beginner
    level: String,

    // Overall Progress
    progress: {
        type: Number,
        default: 0,
    },

    // Budget Range
    investmentRange: {
        type: String,
    },

    estimatedIncome: {
        type: String
    },

    // Total Steps
    steps: mongoose.Schema.Types.ObjectId,
    ref: "RoadMapStep"
    
})

export const Roadmap = mongoose.model("Roadmap", roadmapSchema)