import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema({
    // Task title shown to the learner
    title: {
        type: String,
        required: true,
    },

    //whether the learner completed this task
    isCompleted: {
        type: Boolean,
        default: false
    }
})

export const Task = mongoose.model("Task", taskSchema);