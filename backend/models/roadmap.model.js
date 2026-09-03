import mongoose from "mongoose";

// Task Schema
// Stores each Checklist item inside a step
const roadmapTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: true },
);

// Roadmap Step Schema
const roadmapStepSchema = new mongoose.Schema(
  {
    // Step Number
    order: {
      type: Number,
      required: true,
    },

    // Example: Idea Validation
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Description shown after opening accordion
    description: {
      type: String,
      default: "",
    },

    // Mentor tip
    tip: {
      type: String,
      default: "",
    },

    estimatedDays: {
      type: Number,
      default: 0,
    },

    // Estimated cost for this step
    estimatedCost: {
      type: Number,
      default: 0,
    },

    // Checklist
    tasks: [roadmapTaskSchema],

    // Learning Resources
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
  },
  { _id: true },
);

// Main Roadmap Schema
const roadmapSchema = new mongoose.Schema(
  {
    // Roadmap owner
    businessIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessIdea",
      required: true,
    },

    // Example:
    // Home Tiffin Service
    title: {
      type: String,
      required: true,
    },

    // Food & Catering
    category: {
      type: String,
      required: true,
    },

    // Beginner | Intermediate | Advanced
    level: {
      type: String,
      default: "Beginner",
    },

    //  ₹5,000–15,000
    investmentRange: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    // ₹15,000–40,000/month
    estimatedIncome: {
      type: String,
      default: "",
    },

    // 2-4 weeks
    estimatedDuration: {
      type: String,
      default: "",
    },

    // All roadmap steps
    steps: [roadmapStepSchema],

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

export const Roadmap = mongoose.model("Roadmap", roadmapSchema);
