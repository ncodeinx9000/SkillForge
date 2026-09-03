import mongoose from "mongoose";

const learnerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

     skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    budget: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

     onboardingCompleted: {
      type: Boolean,
      default: false,
    },

    
}, {timestamps: true});

export const LearnerProfile = mongoose.model("LearnerProfile",learnerProfileSchema);