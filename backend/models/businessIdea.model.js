import mongoose, { mongo } from "mongoose";
import { Mentor } from "./mentor.model.js";

const businessIdeaSchema = new mongoose.Schema(
  {
    // Idea Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Category
    category: [
      {
        type: String,
        enum: ["Technology", "Food & Beverage"],
      },
    ],

    // Short Description
    description: {
      type: String,
      required: true,
    },

    // Estimated Investment
    investment: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    // Estimated Monthly Income
    estimatedIncome: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    // Time required to launch
    launchTime: {
      type: String,
      default: "",
    },

    // Beginner / Intermediate / Advanced
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    // Used for recommendation engine
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Benifits
    advantages: [
      {
        type: String,
      },
    ],

    // Challenges
    challenges: [
      {
        type: String,
      },
    ],

    // Government Schemes
    governmentSchemes: [
      {
        type: String,
        description: String,
        link: String,
      },
    ],

    // Tages shown on cards
    tags: [
      {
        type: String,
        enum: [
          "Low Investment",
          "Home Based",
          "Women Friendly",
          "Online",
          "offline",
          "No Inventory",
          "High Demand",
          "Programming",
          "Web Development",
        ],
      },
    ],

    // Cover Image
    image: {
      type: String,
      default: "",
    },

    // Recommended Mentor
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },

    // Admin Created Roadmap
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      default: null,
    },

    // Learning Resources
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    // Whether visible to learners
    isPublished: {
      type: Boolean,
      default: false,
    },

    // Admin who created it
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BusinessIdea = mongoose.model("BusinessIdea", businessIdeaSchema);
