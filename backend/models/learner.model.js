import mongoose from "mongoose";

const learnerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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

    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap"
    },

    selectedBusinessIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessIdea",
      default: null
    }

})