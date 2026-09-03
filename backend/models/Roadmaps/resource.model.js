import mongoose from "mongoose";

// Resource Schema
const resourceSchema = new mongoose.Schema({
    // Resource title
    title: {
        type: String,
        required: true
    },

    // Article/Video/PDF
    file:{
        type: String
    }, 

    // Resource Link
    url: {
        type: String
    }
    })

    export const Resource = mongoose.model("Resource", resourceSchema)