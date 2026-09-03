import mongoose, { mongo } from "mongoose";

const learnerProgressSchema = new mongoose.Schema({
    // Logged-in learner
    learner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


    // Business idea being followed
    businessIdea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessIdea",
        required: true,
    },

    // Roadmap assigned to this business idea
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true,
    },

    status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active"
    },
    // Completed roadmap steps
    completedSteps: [
        {
            stepId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },

            completedAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],

    // Completed tasks
    completedTask: [
        {
            taskId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            completedAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],

    // Completed resources
    completedResources: [
        {
            resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
            required: true
            },

            completedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],


    // Overall roadmap progress(0 - 100)
    roadmapProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },

    resourceProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },

    // Current active step
    currentStep: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },


    // Mentor booking (for future)
    bookedMentor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Mentor",
        },
    ],

    // Roadmap started date
    startedAt: {
        type: Date,
        default: Date.now,
    },

    // Roadmap completed date
    completedAt: {
        type: Date,
        default: null,
    },
},{
    timestamps: true,
});

// Prevent deplicate progress for same learner + business idea
learnerProgressSchema.index(
    { learner: 1, businessIdea: 1},
    {unique: true}
);

export const LearnerProgress = mongoose.model("LearnerProgress",learnerProgressSchema);