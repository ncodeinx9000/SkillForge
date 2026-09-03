import mongoose from "mongoose";

// Roadmap Step Schema
const roadmapStepSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    // Description shown after opening accordion
    description:{
        type: String
    },

    // Helpful mentor tip
    tip: {
        String,
    },

    // Step Status
    status: {
        type: String,
        enum: ["Locked", "Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    // Tasks inside step
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },

    // Related Learning resources
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Resource"
    }

})

export const RoadMapStep = mongoose.model("RoadMapStep", roadmapStepSchema)